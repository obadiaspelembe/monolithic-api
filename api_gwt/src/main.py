
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import requests

app = FastAPI()

CUSTOM_FIELDS_URL = "http://web:8081"

REPORTS_URL = "http://web:8082"

@app.get("/m_custom_fields/{sub_path:path}")
async def custom_fields(sub_path: str):

    response = requests.get(CUSTOM_FIELDS_URL)
    return HTMLResponse(content=response.text, status_code=200)

@app.get("/m_reports/{sub_path:path}")
async def reports(sub_path: str):
    return HTMLResponse(content="Hello there from reports", status_code=200)


@app.get("/")
async def root():
    return HTMLResponse(content="Hello there from api gateway", status_code=200)