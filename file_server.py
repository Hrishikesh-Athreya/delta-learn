from pathlib import Path
from fastapi import FastAPI, UploadFile, File, Form, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
import os, shutil

app = FastAPI(title="File Manager API")

# Point to ./data by default (matches your structure)
ROOT_DIR = Path(os.environ.get("ROOT_DIR", Path(__file__).parent / "data" / "docs")).resolve()
ROOT_DIR.mkdir(parents=True, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"], allow_credentials=True
)

# ---------- helpers ----------
def _secure(rel: str) -> Path:
    rel = (rel or "").strip().lstrip("/")
    p = (ROOT_DIR / rel).resolve()
    if not str(p).startswith(str(ROOT_DIR)):
        raise HTTPException(400, "Invalid path")
    return p

def _node(path: Path, rel: str = "") -> Dict[str, Any]:
    if path.is_dir():
        children = []
        for c in sorted(path.iterdir(), key=lambda x: (x.is_file(), x.name.lower())):
            cr = f"{rel}/{c.name}".strip("/") if rel else c.name
            children.append(_node(c, cr))
        return {"name": path.name if rel else ROOT_DIR.name, "path": rel, "type": "dir", "children": children}
    else:
        return {"name": path.name, "path": rel, "type": "file", "size": path.stat().st_size}

from fastapi import Body

import json

COURSE_FILE = Path("data/input/course_structure.json").resolve()
COURSE_FILE.parent.mkdir(parents=True, exist_ok=True)

# ---------- endpoints ----------
@app.post("/api/course")
def save_course_structure(data: dict = Body(...)):
    """
    Save course structure JSON (full overwrite).
    """
    try:
        with open(COURSE_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save: {e}")
    return {"status": "saved", "file": str(COURSE_FILE)}

@app.get("/api/course")
def get_course_structure():
    """
    Get the current course structure JSON if it exists.
    """
    if not COURSE_FILE.exists():
        raise HTTPException(status_code=404, detail="No course_structure.json found")
    try:
        with open(COURSE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not read: {e}")
    return data


@app.get("/api/tree")
def tree(path: str = Query("", description="Relative dir ('' = root)")):
    p = _secure(path)
    if not p.exists(): raise HTTPException(404, "Path not found")
    return _node(p, path)

@app.post("/api/upload")
def upload(dir: str = Form(""), file: UploadFile = File(...)):
    d = _secure(dir)
    if not d.exists() or not d.is_dir(): raise HTTPException(404, "Directory not found")
    dest = d / Path(file.filename).name
    with open(dest, "wb") as out:
        shutil.copyfileobj(file.file, out)
    return {"status": "ok", "path": str(dest.relative_to(ROOT_DIR))}

@app.post("/api/folder")
def make_folder(parent: str = Form(""), name: str = Form(...)):
    # Create <parent>/<name>
    if name.strip() == "": raise HTTPException(400, "Folder name required")
    parent_abs = _secure(parent)
    if not parent_abs.exists() or not parent_abs.is_dir(): raise HTTPException(404, "Parent not found")
    target = parent_abs / name
    if target.exists(): raise HTTPException(400, "Folder already exists")
    target.mkdir(parents=False)
    return {"status": "created", "path": str(target.relative_to(ROOT_DIR))}

@app.delete("/api/folder")
def rm_folder(path: str = Query(...)):
    # No root delete; only empty folders
    if path.strip() == "": raise HTTPException(400, "Cannot delete root")
    p = _secure(path)
    if not p.exists() or not p.is_dir(): raise HTTPException(404, "Folder not found")
    if any(p.iterdir()): raise HTTPException(400, "Folder is not empty")
    p.rmdir()
    return {"status": "deleted", "path": path}

@app.delete("/api/file")
def rm_file(path: str = Query(...)):
    p = _secure(path)
    if not p.exists() or p.is_dir(): raise HTTPException(404, "File not found")
    p.unlink()
    return {"status": "deleted", "path": path}

@app.get("/healthz")
def health(): return {"status": "ok"}