import json
import os
import threading
from io import BytesIO
from pathlib import Path
from typing import List, Any

import uvicorn
from docutils.parsers.rst.directives.images import Figure
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from google.genai.types import GenerateContentConfig
from pydantic import BaseModel, ConfigDict, Field
from landingai_ade.lib import pydantic_to_json_schema
import pathway as pw
from agentic_doc.parse import parse
from agentic_doc.config import ParseConfig


app = FastAPI()

class DocumentTableItem(BaseModel):
    row_name: str = Field(
        ..., description='Name of the table'
    )
    column_name: str = Field(..., description='Name of the column')
    value: str = Field(
        ..., description='Value at the row and column.'
    )
class DocumentInformationExtractionSchema(BaseModel):
    document_table: List[DocumentTableItem] = Field(
        ...,
        description='Structure of the table'
    )
    document_text: List[str] = Field(
        ...,
        description="Text present in the document in the order in which they're present",
    )

# Convert to JSON schema
schema = pydantic_to_json_schema(DocumentInformationExtractionSchema)

class LandingAICustomDocumentParser(pw.UDF):

    def __init__(self, api_key: str, capacity: int, results_dir: str, cache_strategy: pw.udfs.CacheStrategy = None, *, async_mode: str = "fully_async", **kwargs):
        self.api_key = api_key
        self.async_mode = async_mode
        self.results_dir = results_dir
        self.capacity = capacity
        from pathway.xpacks.llm._utils import _prepare_executor
        executor = _prepare_executor(async_mode)
        super().__init__(cache_strategy=cache_strategy, executor=executor)

    async def parse(self, contents: bytes) -> List[tuple[str, dict]]:

        results_dir = Path(self.results_dir)
        results_dir.mkdir(exist_ok=True)
        # Parse document with LandingAI using proper JSON Schema
        parsed_results = parse(
            contents,
            include_marginalia=True,
            include_metadata_in_markdown=True,
            result_save_dir=str(results_dir),
            extraction_schema=json.loads(schema),
            config=ParseConfig(api_key=self.api_key)
        )

        if not parsed_results:
            return [("", {"source": "landingai", "error": "No parsing results"})]

        parsed_doc = parsed_results[0]
        text_content = getattr(parsed_doc, 'markdown', "")

        # Extract structured data from extraction_metadata if available
        extraction_data = {}
        if hasattr(parsed_doc, 'extraction_metadata') and parsed_doc.extraction_metadata:
            for field, data in parsed_doc.extraction_metadata.items():
                if isinstance(data, dict) and 'value' in data and data['value']:
                    extraction_data[field] = data['value']

        # Create clean metadata with extracted fields
        metadata = {
            "source": "landingai",
            "confidence": str(getattr(parsed_doc, 'confidence', 0.0)),
            **{k: str(v) for k, v in extraction_data.items() if v is not None}
        }

        # Ensure string types for Pathway
        safe_text = str(text_content) if text_content else ""
        safe_metadata = {k: str(v) if v is not None else "" for k, v in metadata.items()}

        return [(safe_text, safe_metadata)]

    async def __wrapped__(self, contents: bytes, **kwargs) -> list[tuple[str, dict]]:
        return await self.parse(contents)




templates = '''
# Complete Slide Template Specification for LLM

## System Prompt for Generating Training Slides

You are a training content generator that creates structured slide data for an e-learning platform. You must generate slides in strict JSON format following these 8 template types. Each slide must include valid JSON with proper structure.


## Slide Type Reference Guide

### **TYPE 1: Title Slide**
**Purpose:** Course/module introduction with single large heading  
**When to use:** First slide of course or major section

**Format:**
```json
{
  "id": "slide-1-1",
  "type": 1,
  "text_list": ["Main Title Only"],
  "image_list": [],
  "figures": []
}
```

**Example:**
```json
{
  "id": "slide-intro",
  "type": 1,
  "text_list": ["Payment Systems Overview"],
  "image_list": [],
  "figures": []
}
```

***

### **TYPE 2: Section Header**
**Purpose:** Module introduction with heading and supporting description  
**When to use:** Start of new topic or concept explanation

**Format:**
```json
{
  "id": "slide-x-x",
  "type": 2,
  "text_list": [
    "Main Heading",
    "Supporting description or explanation"
  ],
  "image_list": [],
  "figures": []
}
```

**Example:**
```json
{
  "id": "slide-2-1",
  "type": 2,
  "text_list": [
    "Why Payment Compliance Matters",
    "Understanding regulatory requirements and protecting customer data in financial transactions is essential for all payment processing businesses"
  ],
  "image_list": [],
  "figures": []
}
```

***

### **TYPE 3: Simple Comparison Table**
**Purpose:** Two-column table for basic comparisons or key-value pairs  
**When to use:** Simple feature comparisons, specification lists

**Format:**
```json
{
  "id": "slide-x-x",
  "type": 3,
  "text_list": [
    "Table Heading",
    "Subtitle or context"
  ],
  "image_list": [],
  "figures": [{
    "type": "table",
    "data": {
      "columns": ["Column1", "Column2"],
      "values": [
        ["Row1Value1", "Row1Value2"],
        ["Row2Value1", "Row2Value2"]
      ]
    }
  }]
}
```

**Example:**
```json
{
  "id": "slide-3-1",
  "type": 3,
  "text_list": [
    "Payment Methods Comparison",
    "Comparison of popular payment methods by usage and security"
  ],
  "image_list": [],
  "figures": [{
    "type": "table",
    "data": {
      "columns": ["Method", "Usage Rate"],
      "values": [
        ["Credit Cards", "High"],
        ["Digital Wallets", "Growing"],
        ["Bank Transfers", "Medium"],
        ["Cash", "Declining"]
      ]
    }
  }]
}
```

***

### **TYPE 4: Multi-Point Content**
**Purpose:** Heading with 2-3 descriptive bullet points  
**When to use:** Key takeaways, best practices, important points

**Format:**
```json
{
  "id": "slide-x-x",
  "type": 4,
  "text_list": [
    "Main Heading",
    "First key point or description",
    "Second key point or description"
  ],
  "image_list": [],
  "figures": []
}
```

**Example:**
```json
{
  "id": "slide-4-1",
  "type": 4,
  "text_list": [
    "Best Practices for Recurring Billing",
    "Transparent pricing and clear terms of service build customer trust",
    "Automated retry logic for failed payments with smart timing maximizes recovery rates and reduces churn"
  ],
  "image_list": [],
  "figures": []
}
```

***

### **TYPE 5: Feature Showcase Table**
**Purpose:** Two-column table with visual badges highlighting features  
**When to use:** Product features, specifications, benefits lists

**Format:**
```json
{
  "id": "slide-x-x",
  "type": 5,
  "text_list": [
    "Feature Heading",
    "Context or description"
  ],
  "image_list": [],
  "figures": [{
    "type": "table",
    "data": {
      "columns": ["Feature", "Details"],
      "values": [
        ["Feature1", "Description1"],
        ["Feature2", "Description2"]
      ]
    }
  }]
}
```

**Example:**
```json
{
  "id": "slide-5-1",
  "type": 5,
  "text_list": [
    "Real-Time Payments (RTP)",
    "Instant payment infrastructure transforming the payment landscape"
  ],
  "image_list": [],
  "figures": [{
    "type": "table",
    "data": {
      "columns": ["Benefit", "Description"],
      "values": [
        ["Speed", "Instant settlement 24/7/365"],
        ["Confirmation", "Immediate payment confirmation"],
        ["Data Rich", "Enhanced remittance information"],
        ["Irrevocable", "Final payment with no returns"]
      ]
    }
  }]
}
```

***

### **TYPE 6: Standard Data Table**
**Purpose:** Multi-column table with header for detailed comparisons  
**When to use:** Compliance requirements, specifications, feature matrices (2-3 columns)

**Format:**
```json
{
  "id": "slide-x-x",
  "type": 6,
  "text_list": ["Table Heading"],
  "image_list": [],
  "figures": [{
    "type": "table",
    "data": {
      "columns": ["Column1", "Column2", "Column3"],
      "values": [
        ["Row1Col1", "Row1Col2", "Row1Col3"],
        ["Row2Col1", "Row2Col2", "Row2Col3"]
      ]
    }
  }]
}
```

**Example:**
```json
{
  "id": "slide-6-1",
  "type": 6,
  "text_list": ["Key Compliance Requirements"],
  "image_list": [],
  "figures": [{
    "type": "table",
    "data": {
      "columns": ["Standard", "Scope", "Region"],
      "values": [
        ["PCI DSS", "Card data protection", "Global"],
        ["GDPR", "Personal data privacy", "European Union"],
        ["PSD2", "Payment services regulation", "European Union"],
        ["SOC 2", "Service organization controls", "Global"]
      ]
    }
  }]
}
```

***

### **TYPE 7: Image Display**
**Purpose:** Heading with full-width image  
**When to use:** Diagrams, flowcharts, infographics, visual explanations

**Format:**
```json
{
  "id": "slide-x-x",
  "type": 7,
  "text_list": ["Image Heading"],
  "image_list": ["https://image-url.com/diagram.png"],
  "figures": []
}
```

**Example:**
```json
{
  "id": "slide-7-1",
  "type": 7,
  "text_list": ["ACH Settlement Cycle Diagram"],
  "image_list": ["https://via.placeholder.com/800x400?text=Settlement+Cycle+Flow"],
  "figures": []
}
```

***

### **TYPE 8: Multi-Column Matrix**
**Purpose:** Complex comparison table with 4+ columns  
**When to use:** Detailed feature comparisons, complex specifications

**Format:**
```json
{
  "id": "slide-x-x",
  "type": 8,
  "text_list": ["Matrix Heading"],
  "image_list": [],
  "figures": [{
    "type": "table",
    "data": {
      "columns": ["Feature", "Option1", "Option2", "Option3", "Option4"],
      "values": [
        ["Row1", "Value1", "Value2", "Value3", "Value4"],
        ["Row2", "Value1", "Value2", "Value3", "Value4"]
      ]
    }
  }]
}
```

**Example:**
```json
{
  "id": "slide-8-1",
  "type": 8,
  "text_list": ["Payment Method Comparison Matrix"],
  "image_list": [],
  "figures": [{
    "type": "table",
    "data": {
      "columns": ["Feature", "ACH", "Wire Transfer", "RTP", "Push-to-Card"],
      "values": [
        ["Speed", "1-3 days", "Same day", "Instant", "Instant"],
        ["Cost", "Low ($0.20-1)", "High ($25-50)", "Medium ($0.50)", "Medium ($1-2)"],
        ["Availability", "24/7", "Business hrs", "24/7", "24/7"],
        ["Amount Limits", "High", "Very High", "Medium", "Low-Medium"]
      ]
    }
  }]
}
```

***

## Critical Rules for LLM Generation:

1. **text_list array indices:**
   - Index 0 is ALWAYS the main heading (required for all types)
   - Type 1: Only 1 item (title only)
   - Type 2: Exactly 2 items (heading + description)
   - Type 3, 5, 6, 8: 1-2 items (heading + optional subtitle)
   - Type 4: 2-3 items (heading + 1-2 points)
   - Type 7: Only 1 item (image caption)

2. **figures array structure:**
   - Only used for Types 3, 5, 6, 8 (tables)
   - Must always include `"type": "table"`
   - `columns` array defines all column headers
   - `values` is 2D array where each inner array represents one table row
   - Number of items in each `values` row must match `columns` length

3. **image_list:**
   - Only used for Type 7
   - Must contain valid image URLs
   - Can include placeholder URLs for mockups

4. **Type selection logic:**
   - Use Type 1 for major section titles
   - Use Type 2 for introducing concepts
   - Use Type 3 for simple 2-column comparisons
   - Use Type 4 for bullet point lists
   - Use Type 5 for feature/benefit tables
   - Use Type 6 for 2-3 column data tables
   - Use Type 7 for visual content
   - Use Type 8 for complex 4+ column matrices

5. **Content guidelines:**
   - Keep headings concise (under 60 characters)
   - Descriptions should be complete sentences
   - Table cells should contain brief, scannable text
   - Avoid special characters that break JSON parsing
'''


class SlideDesc:

    def __init__(self, desc):
        self.desc = desc

class ModuleDesc:

    def __init__(self, desc, slides: list[SlideDesc]):
        self.desc = desc
        self.slides = slides
        self.queries = "For the theme of questioning: " + desc + ". Answer the questions: " + self.get_desc() + ". You can make use of tables and explanations where required."
        self.information = None

    def get_desc(self):
        desc = []
        for slide in self.slides:
            desc.append(slide.desc)
        return ", ".join([f"{i+1}) {item}" for i, item in enumerate(desc)])


class CourseDesc:

    def __init__(self, desc: str, modules: list[ModuleDesc]):
        self.desc = desc
        self.modules = modules



import time

file_count = 0
last_modified = 0
last_indexed = 0




class StatusCheckResult:

    def __init__(self, file_count, last_modified, last_indexed):
        self.file_count = file_count
        self.last_modified = last_modified
        self.last_indexed = last_indexed

def get_course_desc(d) -> CourseDesc:
    return CourseDesc(
        desc=d["course_name"],
        modules=[
            ModuleDesc(
                desc=m["name"],
                slides=[SlideDesc(**l) for l in m.get("slides", [])],
            )
            for m in d.get("modules", [])
        ],
    )


def get_course_information_query(course_desc: CourseDesc):
    for i in range(len(course_desc.modules)):
        module = course_desc.modules[i]
        module.information = (module.desc, module.get_desc())


import requests

def run_info_query(query):
    headers = {
        'accept': '*/*',
        'Content-Type': 'application/json',
    }

    json_data = {
        'prompt': query,
        'return_context_docs': True,
        'response_type': 'long',
    }
    return requests.post('http://0.0.0.0:8000/v2/answer', headers=headers, json=json_data).json()



def query_course_info(course_desc: CourseDesc):
    for module in course_desc.modules:
        module.information = run_info_query(module.queries)


def get_course_information(course_desc: CourseDesc):
    get_course_information_query(course_desc)
    return query_course_info(course_desc)

from typing import List, Literal, Union, Annotated, Optional
from pydantic import BaseModel, ConfigDict, Field

from typing import List, Literal
from pydantic import BaseModel, ConfigDict, Field

class TableData(BaseModel):
    model_config = ConfigDict(extra='forbid')
    rows: List[str]
    columns: List[str]
    values: List[int]

class TableFigure(BaseModel):
    model_config = ConfigDict(extra='forbid')
    type: Literal["table"] = "table"
    data: TableData

class Slide(BaseModel):
    model_config = ConfigDict(extra='forbid')
    text_list: List[str]
    image_list: List[str]
    figures: List[TableFigure] = Field(default_factory=list)

class SlideResult(BaseModel):
    model_config = ConfigDict(extra='forbid')
    id: str
    slide: Slide
# ----- Higher-level containers -----

class Module(BaseModel):
    model_config = ConfigDict(extra='forbid')
    slides: List[Slide] = Field(default_factory=list)

class Course(BaseModel):
    model_config = ConfigDict(extra='forbid')
    modules: List[Module] = Field(default_factory=list)

# import outlines
# from google import genai

from google import genai

client = genai.Client(api_key="")

# client = genai.Client(api_key=)
# model = outlines.from_gemini(client, 'gemini-2.0-flash-lite')

def clean_schema_for_gemini(schema: Any) -> Any:
    if isinstance(schema, dict):
        return {k: clean_schema_for_gemini(v) for k, v in schema.items() if k != 'additionalProperties'}
    elif isinstance(schema, list):
        return [clean_schema_for_gemini(item) for item in schema]
    else:
        return schema

cleaned_schema = clean_schema_for_gemini(SlideResult.model_json_schema())

def get_output_from_llm(slide: SlideDesc, info):
    query = "Please answer the question: " + slide.desc + "From the information. " + str(info) + ". Don't use another other information, use only what I gave you. Make sure to output in the form of the template. The template information is as follows: " + templates
    return client.models.generate_content(
        model='',
        contents=query,
        config=GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=cleaned_schema
        )
    )


def build_course(course_desc: CourseDesc) -> Course:
    modules_out: List[Module] = []

    for mod in course_desc.modules:
        slides_out: List[Slide] = []
        for slide_desc in mod.slides:
            s = get_output_from_llm(slide_desc, mod.information)
            slide_obj = SlideResult.model_validate_json(s.text)
            slides_out.append(slide_obj.slide)
        modules_out.append(Module(slides=slides_out))

    return Course(modules=modules_out)

COURSE_FILE = Path("data/input/course_structure.json")
def recreate_course():
    course_desc = get_course_desc(json.loads(COURSE_FILE.read_text(encoding="utf-8")))
    get_course_information(course_desc)
    return build_course(course_desc)



def process_response(status_check_result: StatusCheckResult):
    global course
    global last_modified
    global last_indexed
    if status_check_result.last_indexed!=last_modified and status_check_result.last_indexed!=last_indexed:
        last_indexed = status_check_result.last_indexed
        last_modified = status_check_result.last_modified
        course = recreate_course().model_dump()
        print("Course created")




def poll_endpoint(url: str, interval: int = 5):
    """Polls the given endpoint every `interval` seconds."""
    while True:
        try:
            response = requests.post(url, timeout=5)
            print(f"[{time.strftime('%H:%M:%S')}] {url} -> {response.status_code}, {response.json()}")
            process_response(StatusCheckResult(**response.json()))
        except Exception as e:
            print(f"Error polling {url}: {e}")
        time.sleep(interval)

course: Course = None

course_map = {1: course}


@app.get("/course/get")
def get_course():
    return JSONResponse(content={"ids":course_map.keys()})

@app.get("/course/get/{course_id}")
def get_course(course_id: int):
    global course
    course = course_map[course_id] if course_id in course_map else {}
    return JSONResponse(content=course)

@app.get("/course/status")
def course_status():
    return JSONResponse(content={"message": "Course is active", "status": "active"})

def run_server():
    uvicorn.run(app, host="127.0.0.1", port=8001, log_level="info")


if __name__ == "__main__":
    threading.Thread(target=run_server, daemon=True).start()
    print(poll_endpoint("http://localhost:8000/v1/statistics", interval=2))