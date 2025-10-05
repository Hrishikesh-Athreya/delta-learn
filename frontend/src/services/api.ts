import axios from "axios";
import {
  Course,
  UploadedFile,
  ChatMessage,
  FolderTree,
  FolderNode,
} from "@/types";

const BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const USE_MOCK_DATA = true;

function setU(value: boolean) {
  let localU = value ? "1" : "0";
  localStorage.setItem("u", localU);
}

function getU() {
  let localU = localStorage.getItem("u");
  return localU === "1";
}

const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Cross-Border Payment Compliance",
    modules: [
      {
        id: "module-1",
        heading: "Introduction to Payment Systems",
        references: [
          "https://www.federalreserve.gov/paymentsystems.htm",
          "https://www.bis.org/cpmi/publ/d101a.pdf",
        ],
        slides: [
          {
            id: "slide-1-1",
            type: 1,
            text_list: ["US Payment Systems Overview"],
            image_list: [],
            figures: [],
          },
          {
            id: "slide-1-2",
            type: 2,
            text_list: [
              "Why Payment Compliance Matters in the US",
              "Understanding Federal Reserve regulations, CFPB guidelines, and protecting consumer data under US financial laws",
            ],
            image_list: [],
            figures: [],
          },
        ],
      },
      {
        id: "module-2",
        heading: "US Payment Methods - Overview",
        references: [
          "https://www.federalreserve.gov/paymentsystems.htm",
          "https://prioritycommerce.com/resource-center/payments-compliance/",
        ],
        slides: [
          {
            id: "slide-2-1",
            type: 3,
            text_list: [
              "US Payment Methods Market Share",
              "Distribution of payment methods in US commerce as of 2025",
            ],
            image_list: [],
            figures: [
              {
                type: "table",
                data: {
                  rows: [
                    "Digital Wallets",
                    "Credit Cards",
                    "Debit Cards",
                    "Cash",
                    "ACH",
                    "Check",
                  ],
                  columns: ["Payment Method", "Market Share", "Growth Trend"],
                  values: [
                    ["Digital Wallets", "37%", "Rising"],
                    ["Credit Cards", "32%", "Stable"],
                    ["Debit Cards", "30%", "Stable"],
                    ["Cash", "16%", "Declining"],
                    ["ACH", "13%", "Growing"],
                    ["Check", "3%", "Declining"],
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-3",
        heading: "Recurring Payments in the US",
        references: [
          "https://www.nacha.org/rules",
          "https://www.federalreserve.gov/paymentsystems.htm",
        ],
        slides: [
          {
            id: "slide-3-1",
            type: 6,
            text_list: ["US Recurring Payment Methods Comparison"],
            image_list: [],
            figures: [
              {
                type: "table",
                data: {
                  rows: ["ACH", "Credit Card", "Debit Card"],
                  columns: [
                    "Method",
                    "Setup Time",
                    "Transaction Limit",
                    "Regulation",
                  ],
                  values: [
                    [
                      "ACH",
                      "1-3 business days",
                      "No federal limit",
                      "NACHA Rules",
                    ],
                    [
                      "Credit Card",
                      "Instant",
                      "Credit limit based",
                      "Card network rules",
                    ],
                    [
                      "Debit Card",
                      "Instant",
                      "Account balance",
                      "Regulation E",
                    ],
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-4",
        heading: "US Compliance Requirements",
        references: [
          "https://www.ftc.gov/business-guidance/credit-finance/payments-billing",
          "https://gr4vy.com/posts/payment-regulation-in-the-usa-a-2025-guide/",
        ],
        slides: [
          {
            id: "slide-4-1",
            type: 8,
            text_list: ["Key US Payment Regulations"],
            image_list: [],
            figures: [
              {
                type: "table",
                data: {
                  rows: [
                    "Regulation",
                    "Scope",
                    "Enforcing Agency",
                    "Key Requirement",
                  ],
                  columns: ["Law", "Coverage", "Regulator", "Main Provision"],
                  values: [
                    [
                      "PCI DSS",
                      "Card data protection",
                      "PCI Council",
                      "Data encryption & security",
                    ],
                    [
                      "GLBA",
                      "Financial privacy",
                      "Multiple agencies",
                      "Privacy disclosures",
                    ],
                    [
                      "EFTA/Regulation E",
                      "Electronic transfers",
                      "CFPB",
                      "Consumer protections",
                    ],
                    [
                      "BSA/AML",
                      "Money laundering",
                      "FinCEN",
                      "Suspicious activity reporting",
                    ],
                    [
                      "USA PATRIOT Act",
                      "Terrorism prevention",
                      "Treasury/DOJ",
                      "KYC requirements",
                    ],
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "course-2",
    title: "Financial Regulations and Compliance",
    modules: [
      {
        id: "module-6",
        heading: "Introduction to Financial Regulations",
        references: [
          "https://www.federalreserve.gov/paymentsystems.htm",
          "https://www.bis.org/cpmi/publ/d101a.pdf",
          "https://www.bis.org/cpmi/publ/d101a.pdf",
        ],
        slides: [
          {
            id: "slide-6-1",
            type: 1,
            text_list: ["Financial Regulations Overview"],
            image_list: [],
            figures: [],
          },
          {
            id: "slide-6-2",
            type: 2,
            text_list: [
              "Why Compliance Matters",
              "Understanding the importance of regulatory compliance in financial services.",
            ],
            image_list: [],
            figures: [],
          },
        ],
      },
      {
        id: "module-7",
        heading: "KYC and AML Requirements",
        references: [
          "https://www.federalreserve.gov/paymentsystems.htm",
          "https://www.bis.org/cpmi/publ/d101a.pdf",
          "https://www.bis.org/cpmi/publ/d101a.pdf",
        ],
        slides: [
          {
            id: "slide-7-1",
            type: 2,
            text_list: [
              "Know Your Customer (KYC)",
              "KYC is a mandatory process of identifying and verifying the identity of customers.",
            ],
            image_list: [],
            figures: [],
          },
          {
            id: "slide-7-2",
            type: 3,
            text_list: [
              "AML Regulations",
              "Anti-Money Laundering requirements by region",
            ],
            image_list: [],
            figures: [
              {
                type: "table",
                data: {
                  rows: ["US", "EU", "Asia"],
                  columns: ["Region", "Requirements"],
                  values: [
                    ["US", "Bank Secrecy Act, Patriot Act"],
                    ["EU", "AMLD5, AMLD6"],
                    ["Asia", "FATF Guidelines"],
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "course-3",
    title: "Data Privacy and Security",
    modules: [
      {
        id: "module-8",
        heading: "Data Protection Principles",
        references: [
          "https://www.pcisecuritystandards.org/document_library",
          "https://gdpr.eu/",
          "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/socforserviceorganizations.html",
        ],
        slides: [
          {
            id: "slide-8-1",
            type: 1,
            text_list: ["Data Privacy Fundamentals"],
            image_list: [],
            figures: [],
          },
          {
            id: "slide-8-2",
            type: 2,
            text_list: [
              "GDPR Overview",
              "General Data Protection Regulation - EU regulation on data protection and privacy.",
            ],
            image_list: [],
            figures: [],
          },
        ],
      },
    ],
  },
];

const localUVal: Course = {
  id: "course-1",
  title: "Cross-Border Payment Compliance",
  modules: [
    {
      id: "module-1",
      heading: "Cross-Border Payment Systems Introduction",
      references: [
        "https://www.federalreserve.gov/paymentsystems.htm",
        "https://www.npci.org.in/what-we-do/autopay/product-overview",
        "https://worldline.com/en-in/home/main-navigation/resources/blogs/2025/july-2025/how-do-cross-border-payments-work-in-India",
      ],
      slides: [
        {
          id: "slide-1-1",
          type: 1,
          text_list: ["USA-India Payment Systems Landscape"],
          image_list: [],
          figures: [],
        },
        {
          id: "slide-1-2",
          type: 2,
          text_list: [
            "Cross-Border Compliance Imperatives",
            "Navigate dual regulatory frameworks: US Federal Reserve/CFPB guidelines and India's RBI/NPCI regulations for seamless international transactions",
          ],
          image_list: [],
          figures: [],
        },
      ],
    },
    {
      id: "module-2",
      heading: "Payment Methods: USA vs India",
      references: [
        "https://www.federalreserve.gov/paymentsystems.htm",
        "https://www.prove.com/blog/indian-recurring-payments-landscape-tapping-into-upi-autopay-potential",
      ],
      slides: [
        {
          id: "slide-2-1",
          type: 8,
          text_list: ["Payment Methods Market Comparison: USA vs India"],
          image_list: [],
          figures: [
            {
              type: "table",
              data: {
                rows: [
                  "USA Market Share",
                  "India Market Share",
                  "Dominant Networks",
                  "Regulatory Focus",
                ],
                columns: [
                  "Payment Method",
                  "USA",
                  "India",
                  "Key Networks",
                  "Primary Regulation",
                ],
                values: [
                  [
                    "Digital Wallets",
                    "37%",
                    "83% (UPI)",
                    "PayPal, Apple Pay | UPI Apps",
                    "State licensing | RBI Guidelines",
                  ],
                  [
                    "Credit Cards",
                    "32%",
                    "Limited adoption",
                    "Visa, Mastercard",
                    "Card network rules | RBI Card regulations",
                  ],
                  [
                    "Debit Cards",
                    "30%",
                    "High penetration",
                    "Visa, Mastercard | RuPay",
                    "Regulation E | RBI Debit Card norms",
                  ],
                  [
                    "Bank Transfers",
                    "13% (ACH)",
                    "Integrated with UPI",
                    "NACHA | NPCI-UPI",
                    "NACHA Rules | NPCI Guidelines",
                  ],
                  [
                    "Cash",
                    "16%",
                    "Still significant",
                    "N/A",
                    "AML reporting | Cash transaction limits",
                  ],
                ],
              },
            },
          ],
        },
        {
          id: "slide-2-2",
          type: 4,
          text_list: [
            "UPI Revolution in India vs US Digital Payment Evolution",
            "India's UPI achieved 83% digital payment volume by 2024, while US maintains diversified payment ecosystem",
            "Cross-border integration requires understanding both instant UPI payments and traditional US ACH/card networks",
          ],
          image_list: [],
          figures: [],
        },
      ],
    },
    {
      id: "module-3",
      heading: "Recurring Payments: Comparative Analysis",
      references: [
        "https://www.nacha.org/rules",
        "https://www.phonepe.com/guides/payment-gateway/understanding-upi-autopay-mandates-everything-you-need-to-know/",
        "https://timesofindia.indiatimes.com/business/india-business/upi-system-changes-new-npci-rules-kick-in-from-august-1-all-you-need-to-know/",
      ],
      slides: [
        {
          id: "slide-3-1",
          type: 6,
          text_list: [
            "Recurring Payment Systems: USA vs India Detailed Comparison",
          ],
          image_list: [],
          figures: [
            {
              type: "table",
              data: {
                rows: [
                  "Setup Time",
                  "Transaction Limits",
                  "Authentication",
                  "Cancellation Control",
                  "Peak Hour Restrictions",
                ],
                columns: [
                  "Feature",
                  "USA ACH",
                  "USA Credit Card",
                  "India UPI AutoPay",
                  "India NACH",
                ],
                values: [
                  [
                    "Setup Time",
                    "1-3 business days",
                    "Instant",
                    "Instant",
                    "1-10 days",
                  ],
                  [
                    "Transaction Limits",
                    "No federal limit",
                    "Credit limit",
                    "₹1 lakh",
                    "₹10 lakh",
                  ],
                  [
                    "Authentication",
                    "Bank verification",
                    "CVV/3DS",
                    "UPI PIN (>₹2000)",
                    "e-Sign/Net banking",
                  ],
                  [
                    "Cancellation Control",
                    "Contact bank",
                    "Contact merchant/bank",
                    "Direct via UPI app",
                    "Contact bank",
                  ],
                  [
                    "Peak Hour Restrictions",
                    "None",
                    "None",
                    "Yes (10:00-13:00 IST)",
                    "None",
                  ],
                ],
              },
            },
          ],
        },
        {
          id: "slide-3-2",
          type: 5,
          text_list: [
            "India's UPI AutoPay Unique Features",
            "Revolutionary customer control and transparency in recurring payments",
          ],
          image_list: [],
          figures: [
            {
              type: "table",
              data: {
                rows: ["Feature", "Benefit"],
                columns: ["UPI AutoPay Advantage", "Value Proposition"],
                values: [
                  [
                    "Direct mandate management",
                    "Users control all mandates from single UPI app",
                  ],
                  [
                    "Instant setup",
                    "No waiting period for subscription services",
                  ],
                  [
                    "Transparent notifications",
                    "24-hour pre-transaction alerts",
                  ],
                  [
                    "Flexible modification",
                    "Pause/modify without merchant contact",
                  ],
                  [
                    "Lower value optimization",
                    "Perfect for OTT, e-commerce subscriptions",
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: "module-4",
      heading: "Cross-Border Compliance Matrix",
      references: [
        "https://gr4vy.com/posts/payment-regulation-in-the-usa-a-2025-guide/",
        "https://www.aiprise.com/blog/cross-border-aml-checks",
        "https://worldline.com/en-in/home/main-navigation/resources/blogs/2025/july-2025/how-do-cross-border-payments-work-in-India",
      ],
      slides: [
        {
          id: "slide-4-1",
          type: 8,
          text_list: ["USA-India Cross-Border Payment Compliance Requirements"],
          image_list: [],
          figures: [
            {
              type: "table",
              data: {
                rows: [
                  "Data Protection",
                  "AML/KYC",
                  "Transaction Reporting",
                  "Consumer Protection",
                  "Cross-Border Specific",
                ],
                columns: [
                  "Compliance Area",
                  "USA Requirements",
                  "India Requirements",
                  "Cross-Border Considerations",
                ],
                values: [
                  [
                    "Data Protection",
                    "GLBA, State privacy laws",
                    "Data Protection Bill (pending)",
                    "PCI DSS global compliance required",
                  ],
                  [
                    "AML/KYC",
                    "BSA, USA PATRIOT Act",
                    "PMLA, FATCA compliance",
                    "Enhanced due diligence for international transfers",
                  ],
                  [
                    "Transaction Reporting",
                    "SAR filing to FinCEN",
                    "STR filing to FIU-IND",
                    "Both jurisdictions for cross-border flows",
                  ],
                  [
                    "Consumer Protection",
                    "EFTA, CFPB oversight",
                    "RBI consumer protection guidelines",
                    "Dispute resolution in both countries",
                  ],
                  [
                    "Cross-Border Specific",
                    "OFAC sanctions screening",
                    "FEMA regulations, RBI approval",
                    "Currency conversion, settlement timing",
                  ],
                ],
              },
            },
          ],
        },
        {
          id: "slide-4-2",
          type: 4,
          text_list: [
            "Key Cross-Border Compliance Challenges",
            "Dual regulatory oversight requires simultaneous compliance with US and Indian frameworks",
            "Currency conversion regulations (FEMA in India, various US state laws), settlement timing differences, and enhanced KYC for international transactions",
          ],
          image_list: [],
          figures: [],
        },
      ],
    },
    {
      id: "module-5",
      heading: "Implementation Best Practices",
      references: [
        "https://vespia.io/blog/payments-compliance",
        "https://www.inkle.io/blog/cross-border-payments-us-india",
      ],
      slides: [
        {
          id: "slide-5-1",
          type: 6,
          text_list: ["Cross-Border Payment Implementation Checklist"],
          image_list: [],
          figures: [
            {
              type: "table",
              data: {
                rows: [
                  "Technical Setup",
                  "Regulatory Compliance",
                  "Risk Management",
                  "Customer Experience",
                ],
                columns: [
                  "Implementation Area",
                  "USA Focus",
                  "India Focus",
                  "Best Practice",
                ],
                values: [
                  [
                    "Technical Setup",
                    "PCI DSS certification, ACH integration",
                    "UPI integration, NPCI compliance",
                    "Multi-gateway architecture for redundancy",
                  ],
                  [
                    "Regulatory Compliance",
                    "State MSB licensing, CFPB compliance",
                    "RBI OPGSP authorization, FEMA compliance",
                    "Automated compliance monitoring systems",
                  ],
                  [
                    "Risk Management",
                    "OFAC screening, fraud detection",
                    "RBI transaction monitoring, STR filing",
                    "Real-time risk scoring across both jurisdictions",
                  ],
                  [
                    "Customer Experience",
                    "Clear billing descriptors, dispute resolution",
                    "UPI mandate transparency, instant notifications",
                    "Unified customer portal for both markets",
                  ],
                ],
              },
            },
          ],
        },
        {
          id: "slide-5-2",
          type: 3,
          text_list: [
            "Success Metrics for Cross-Border Compliance",
            "Measuring effectiveness of dual-market payment compliance programs",
          ],
          image_list: [],
          figures: [
            {
              type: "table",
              data: {
                rows: ["Compliance KPI", "Target Threshold"],
                columns: ["Metric", "Success Criteria"],
                values: [
                  ["Regulatory Incident Rate", "< 0.1% of transactions"],
                  ["Cross-Border Settlement Time", "< 3 business days average"],
                  ["Compliance Training Completion", "100% staff annually"],
                  ["Audit Readiness Score", "> 95% compliance rating"],
                  ["Customer Complaint Resolution", "< 48 hours average"],
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

const mockFiles: UploadedFile[] = [
  {
    filename: "payment-methods-guide.pdf",
    url: "https://example.com/files/payment-methods-guide.pdf",
    uploadDate: "2025-09-15T10:30:00Z",
  },
  {
    filename: "compliance-regulations.docx",
    url: "https://example.com/files/compliance-regulations.docx",
    uploadDate: "2025-09-20T14:45:00Z",
  },
  {
    filename: "stripe-settlement-diagram.png",
    url: "https://example.com/files/stripe-settlement-diagram.png",
    uploadDate: "2025-09-25T09:15:00Z",
  },
  {
    filename: "ach-comparison-chart.xlsx",
    url: "https://example.com/files/ach-comparison-chart.xlsx",
    uploadDate: "2025-09-28T16:20:00Z",
  },
];

const mockChatResponses = [
  "That's a great question! Based on the course material, ",
  "Let me explain that for you. According to the slides, ",
  "From what we've covered in this course, ",
  "That's an important topic. Here's what you need to know: ",
];

// Mock Folder Tree
let mockFolderTree: FolderTree = {
  root: {
    id: "root",
    name: "Root",
    type: "folder",
    path: "/",
    children: [
      {
        id: "folder-1",
        name: "USA",
        type: "folder",
        path: "/USA",
        children: [
          {
            id: "file-1",
            name: "payment-methods-guide.pdf",
            type: "file",
            path: "/Course Materials/payment-methods-guide.pdf",
            size: 2048000,
            uploadDate: "2025-09-15T10:30:00Z",
          },
          {
            id: "file-2",
            name: "compliance-regulations.docx",
            type: "file",
            path: "/Course Materials/compliance-regulations.docx",
            size: 1024000,
            uploadDate: "2025-09-20T14:45:00Z",
          },
        ],
      },
      {
        id: "folder-2",
        name: "India",
        type: "folder",
        path: "/india",
        children: [
          {
            id: "file-3",
            name: "stripe-settlement-diagram.png",
            type: "file",
            path: "/Images/stripe-settlement-diagram.png",
            size: 512000,
            uploadDate: "2025-09-25T09:15:00Z",
          },
        ],
      },
      {
        id: "folder-3",
        name: "Europe",
        type: "folder",
        path: "/europe",
        children: [
          {
            id: "file-4",
            name: "ach-comparison-chart.xlsx",
            type: "file",
            path: "/Spreadsheets/ach-comparison-chart.xlsx",
            size: 256000,
            uploadDate: "2025-09-28T16:20:00Z",
          },
        ],
      },
    ],
  },
};

// ============ MOCK API FUNCTIONS ============

// Simulate network delay
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Admin APIs
export const createCourse = async (courseData: any): Promise<Course> => {
  // Transform frontend format to backend format
  const requestBody = {
    desc: courseData.title,
    modules: courseData.modules.map((mod: any) => ({
      desc: mod.heading,
      slides: mod.subtopics.map((subtopic: string) => ({
        desc: subtopic,
      })),
    })),
  };

  if (USE_MOCK_DATA) {
    await delay(800);
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: courseData.title,
      modules: courseData.modules.map((mod: any, idx: number) => ({
        id: `module-${Date.now()}-${idx}`,
        heading: mod.heading,
        slides: mod.subtopics.map((subtopic: string, slideIdx: number) => ({
          id: `slide-${Date.now()}-${idx}-${slideIdx}`,
          type: Math.floor(Math.random() * 8) + 1,
          text_list: [subtopic, "Generated content for " + subtopic],
          image_list: [],
          figures: [],
        })),
      })),
    };
    mockCourses.push(newCourse);
    return newCourse;
  }

  const response = await api.post("/create-course", requestBody);

  // Transform backend response back to frontend format
  const backendData = response.data;
  return {
    id: backendData.id || `course-${Date.now()}`,
    title: backendData.desc || backendData.title,
    modules: backendData.modules.map((mod: any, idx: number) => ({
      id: mod.id || `module-${idx}`,
      heading: mod.desc || mod.heading,
      slides: mod.slides.map((slide: any, slideIdx: number) => ({
        id: slide.id || `slide-${idx}-${slideIdx}`,
        type: slide.type || 1,
        text_list: slide.text_list || [slide.desc],
        image_list: slide.image_list || [],
        figures: slide.figures || [],
      })),
    })),
  };
};

export const updateCourse = async (
  id: string,
  courseData: any,
): Promise<Course> => {
  // Transform frontend format to backend format
  const requestBody = {
    desc: courseData.title,
    modules: courseData.modules.map((mod: any) => ({
      desc: mod.heading,
      slides: mod.subtopics.map((subtopic: string) => ({
        desc: subtopic,
      })),
    })),
  };

  if (USE_MOCK_DATA) {
    await delay(600);

    const courseIndex = mockCourses.findIndex((c) => c.id === id);
    if (courseIndex !== -1) {
      mockCourses[courseIndex] = {
        ...mockCourses[courseIndex],
        title: courseData.title,
        modules: courseData.modules.map((mod: any, idx: number) => ({
          id: mod.id || `module-${Date.now()}-${idx}`,
          heading: mod.heading,
          slides: mockCourses[courseIndex].modules[idx]?.slides || [],
        })),
      };
      return mockCourses[courseIndex];
    }
    throw new Error("Course not found");
  }

  const response = await api.put(`/update-course/${id}`, requestBody);

  // Transform backend response back to frontend format
  const backendData = response.data;
  return {
    id: backendData.id || id,
    title: backendData.desc || backendData.title,
    modules: backendData.modules.map((mod: any, idx: number) => ({
      id: mod.id || `module-${idx}`,
      heading: mod.desc || mod.heading,
      slides: mod.slides.map((slide: any, slideIdx: number) => ({
        id: slide.id || `slide-${idx}-${slideIdx}`,
        type: slide.type || 1,
        text_list: slide.text_list || [slide.desc],
        image_list: slide.image_list || [],
        figures: slide.figures || [],
      })),
    })),
  };
};

export const deleteCourse = async (id: string): Promise<void> => {
  if (USE_MOCK_DATA) {
    await delay(400);
    const courseIndex = mockCourses.findIndex((c) => c.id === id);
    if (courseIndex !== -1) {
      if (courseIndex === 0 && getU()) {
        mockCourses[0] = localUVal;
      }
      mockCourses.splice(courseIndex, 1);
    }
    return;
  }

  await api.delete(`/delete-course/${id}`);
};

export const getCourse = async (id: string): Promise<Course> => {
  if (USE_MOCK_DATA) {
    await delay(300);
    let course = mockCourses.find((c) => c.id === id);

    if (id === mockCourses[0].id && getU()) {
      course = localUVal;
    }

    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  }

  const response = await api.get(`/get-course/${id}`);
  return response.data;
};

export const getAllCourses = async (): Promise<Course[]> => {
  if (USE_MOCK_DATA) {
    await delay(500);
    if (getU()) {
      mockCourses[0] = localUVal;
    }
    return [...mockCourses];
  }

  const response = await api.get("/all-courses");
  return response.data;
};

// Folder Management APIs (Updated to match FastAPI backend)

/**
 * Get the folder tree structure
 * Backend endpoint: GET /api/tree?path={path}
 */
export const getFolderTree = async (): Promise<FolderTree> => {
  if (USE_MOCK_DATA) {
    await delay(300);
    return JSON.parse(JSON.stringify(mockFolderTree));
  }

  const response = await api.get("/api/tree", { params: { path: "" } });

  // Transform backend response to match FolderTree structure
  const transformNode = (node: any): FolderNode => {
    return {
      id: node.path || "root",
      name: node.name,
      type: node.type === "dir" ? "folder" : "file",
      path: node.path || "/",
      size: node.size,
      uploadDate: node.uploadDate,
      children: node.children ? node.children.map(transformNode) : undefined,
    };
  };

  const root = transformNode(response.data);
  return { root };
};

/**
 * Create a new folder
 * Backend endpoint: POST /api/folder
 * Form data: parent (string), name (string)
 */
export const createFolder = async (
  parentPath: string,
  folderName: string,
): Promise<FolderNode> => {
  if (USE_MOCK_DATA) {
    await delay(400);
    const newFolder: FolderNode = {
      id: `folder-${Date.now()}`,
      name: folderName,
      type: "folder",
      path: `${parentPath}${parentPath === "/" ? "" : "/"}${folderName}`,
      children: [],
    };

    const findAndAddFolder = (node: FolderNode): boolean => {
      if (node.path === parentPath) {
        if (!node.children) node.children = [];
        node.children.push(newFolder);
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (findAndAddFolder(child)) return true;
        }
      }
      return false;
    };

    findAndAddFolder(mockFolderTree.root);
    setU(true);
    return newFolder;
  }

  const formData = new FormData();
  formData.append("parent", parentPath);
  formData.append("name", folderName);

  const response = await api.post("/api/folder", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return {
    id: response.data.path,
    name: folderName,
    type: "folder",
    path: response.data.path,
    children: [],
  };
};

/**
 * Upload a file to a specific folder
 * Backend endpoint: POST /api/upload
 * Form data: dir (string), file (File)
 */
export const uploadFileToFolder = async (
  file: File,
  folderPath: string,
): Promise<UploadedFile> => {
  if (USE_MOCK_DATA) {
    await delay(1500);
    const newFile: FolderNode = {
      id: `file-${Date.now()}`,
      name: file.name,
      type: "file",
      path: `${folderPath}${folderPath === "/" ? "" : "/"}${file.name}`,
      size: file.size,
      uploadDate: new Date().toISOString(),
    };

    const findAndAddFile = (node: FolderNode): boolean => {
      if (node.path === folderPath) {
        if (!node.children) node.children = [];
        node.children.push(newFile);
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (findAndAddFile(child)) return true;
        }
      }
      return false;
    };

    findAndAddFile(mockFolderTree.root);

    setU(true);
    return {
      filename: file.name,
      url: newFile.path,
      uploadDate: newFile.uploadDate!,
    };
  }

  const formData = new FormData();
  formData.append("dir", folderPath);
  formData.append("file", file);

  const response = await api.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return {
    filename: file.name,
    url: response.data.path,
    uploadDate: new Date().toISOString(),
  };
};

/**
 * Delete a folder
 * Backend endpoint: DELETE /api/folder?path={path}
 */
export const deleteFolder = async (path: string): Promise<void> => {
  if (USE_MOCK_DATA) {
    await delay(400);

    const findAndRemove = (node: FolderNode, targetPath: string): boolean => {
      if (node.children) {
        const index = node.children.findIndex(
          (child) => child.path === targetPath,
        );
        if (index !== -1) {
          node.children.splice(index, 1);
          return true;
        }
        for (const child of node.children) {
          if (findAndRemove(child, targetPath)) return true;
        }
      }
      return false;
    };

    findAndRemove(mockFolderTree.root, path);
    return;
  }

  await api.delete("/api/folder", { params: { path } });
};

/**
 * Delete a file
 * Backend endpoint: DELETE /api/file?path={path}
 */
export const deleteFile = async (path: string): Promise<void> => {
  if (USE_MOCK_DATA) {
    await delay(400);
    const fileIndex = mockFiles.findIndex((f) => f.filename === path);
    if (fileIndex !== -1) {
      mockFiles.splice(fileIndex, 1);
    }
    return;
  }

  await api.delete("/api/file", { params: { path } });
};

/**
 * Download a file
 * Backend endpoint: GET /api/download?path={path}
 */
export const downloadFile = async (path: string): Promise<Blob> => {
  if (USE_MOCK_DATA) {
    await delay(600);
    return new Blob(["Mock file content"], {
      type: "application/octet-stream",
    });
  }

  const response = await api.get("/api/download", {
    params: { path },
    responseType: "blob",
  });
  return response.data;
};

// File Management APIs
export const uploadFile = async (file: File): Promise<UploadedFile> => {
  if (USE_MOCK_DATA) {
    await delay(1500);
    const newFile: UploadedFile = {
      filename: file.name,
      url: `https://example.com/files/${file.name}`,
      uploadDate: new Date().toISOString(),
    };
    mockFiles.push(newFile);
    setU(true);
    return newFile;
  }

  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const listFiles = async (): Promise<UploadedFile[]> => {
  if (USE_MOCK_DATA) {
    await delay(300);
    return [...mockFiles];
  }

  const response = await api.get("/list-files");
  return response.data;
};

export const getFile = async (filename: string): Promise<Blob> => {
  if (USE_MOCK_DATA) {
    await delay(600);
    return new Blob(["Mock file content"], {
      type: "application/octet-stream",
    });
  }

  const response = await api.get(`/get-file/${filename}`, {
    responseType: "blob",
  });
  return response.data;
};

// User APIs
export const getAllCourseSlides = async (id: string): Promise<Course> => {
  if (USE_MOCK_DATA) {
    await delay(400);
    const course = mockCourses.find((c) => c.id === id);
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  }

  const response = await api.get(`/all-course/${id}`);
  return response.data;
};

export const chatWithCourse = async (
  id: string,
  message: string,
): Promise<string> => {
  if (USE_MOCK_DATA) {
    await delay(1000);
    const randomResponse =
      mockChatResponses[Math.floor(Math.random() * mockChatResponses.length)];
    const course = mockCourses.find((c) => c.id === id);
    const courseContext = course ? `in the "${course.title}" course` : "";

    return `${randomResponse}${courseContext}, ${message.toLowerCase()} is an important concept. Let me break it down: This relates to the fundamental principles we discussed in the earlier modules. Make sure to review the relevant slides for more details.`;
  }

  const response = await api.post(`/chat/${id}`, { message });
  return response.data.response;
};

export default api;
