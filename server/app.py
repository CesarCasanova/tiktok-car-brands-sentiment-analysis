from fastapi import FastAPI
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware

import csv
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/data")
def get_csv_data():
    try:
        with open("sentiment_analysis_textblob.csv", newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            data = []
            for row in reader:
                row['Video views'] = int(row['Video views'])
                row['Like count'] = int(row['Like count'])
                row['Comment count'] = int(row['Comment count'])
                row['Engagement rate'] = float(row['Engagement rate'])
                data.append(row)
        return JSONResponse(content=data)
    except FileNotFoundError:
        return JSONResponse(content={"error": "CSV file not found"}, status_code=404)
