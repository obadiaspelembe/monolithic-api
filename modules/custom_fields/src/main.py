
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()


@app.get("/m_custom_fields/")
async def root():
    return HTMLResponse(content="Hello there from custom_fields root", status_code=200)

@app.get("/pet")
async def pet():
    return HTMLResponse(content="Hello there from pet root", status_code=200)

@app.get("/pet/{id}")
async def pet_by_id(id):
    return HTMLResponse(content="Hello there from pet by id {0}".format(id), status_code=200)