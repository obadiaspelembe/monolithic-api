
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()


@app.get("/m_custom_fields/")
async def root():
    return HTMLResponse(content="Hello there from custom_fields root", status_code=200)