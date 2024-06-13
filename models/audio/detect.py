from googleapiclient import discovery

def analyze_text(text):
    api_key = "AIzaSyCFg_uHe4x2ViVLG3a4eYDdCLsfKPrgYDU"
    #service = discovery.build("commentanalyzer", "v1alpha1", developerKey=api_key)
    service = discovery.build("commentanalyzer", "v1alpha1", developerKey=api_key, 
                              discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
                              static_discovery=False,)

    analyze_request = {
        "comment": {"text": text},
        "requestedAttributes": {"TOXICITY": {}},
    }

    response = service.comments().analyze(body=analyze_request).execute()

    toxicity_score = response["attributeScores"]["TOXICITY"]["summaryScore"]["value"]
    
    return toxicity_score

