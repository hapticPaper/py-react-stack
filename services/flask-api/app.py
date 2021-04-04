from flask import Flask, request,  redirect, render_template, jsonify, send_file, send_from_directory, stream_with_context
import random
import datetime 
import pandas

from flask_restful import reqparse
import os, logging
l = logging.getLogger()

FLASK_HOST = os.getenv('FLASK_HOST', 'localhost')
print(f"read in env file - {os.getenv('SMPLE', '')}")
print(f"read in secrets.env file - {os.getenv('ENVSECRET', '')}")

FLASK_PORT = os.getenv('FLASK_PORT', 5505)
DEBUG_FLASK = True
ENDPOINT = os.getenv('ENDPOINT', '/v1')
l.info(f"Starting flask on {FLASK_HOST}:{FLASK_PORT}")


app = Flask("data_api")


def parseParams(paramNames: list) -> dict:
    parser = reqparse.RequestParser()
    for name in paramNames:
        parser.add_argument(name ,type=str, required=False, default=None, action='overwrite')

    return parser.parse_args()
    
    

@app.route('/')
@app.route('/oops/<reason>')
def mainIndex(reason=False):
    warning = f"Please read instructions carefully. - {reason}" if reason else ""
    return (f"""<h2>Connection: successful</h2>
                Help Link:  <a href='/apihelp'>Flask API Help</a><br><br>
                Real Data Endpoint Examples: <br>
                '2x': n x 2 - <a href='/data/2x?x=100'>/data/2x?x=100</a> <br>
                'xy': n x 2 - <a href='/data/xy?x=100&y=42'>data/xy?x=100&y=42</a> <br>
                'xmody': n x 2 - <a href='/data/xmody?x=100&y=9'>/data/xmody?x=100&y=9</a> 
                <br><br><h4>{warning}<h4>
                <br>
                <h3>Data API for React dashboard integration</h3><br>
                API Version Base: {ENDPOINT}<br>
                Only route: esg_random<br>
                Link:  <a href='{ENDPOINT}/dashboardAPIdemo'>{ENDPOINT}/dashboardAPIdemo</a> 
                """, 200)

API_FUNCTIONS = {'2x': (lambda x: 2*x),
                 'xy': (lambda x, y: float(x) * float(y)),
                    'xmody': (lambda x, y: float(x) % float(y))
                }



@app.route('/data/<function>')
def dynamicData(function):
    params = parseParams(['x','y'])
    inputs = []
    try:
        result = API_FUNCTIONS[function](*list(params.values()))
        return jsonify({'function':function, 
                    'inputs': list(params.values()),
                    'result': result})
    except Exception as e:
        return redirect(f'/oops/{e}', 302)


@app.route(f'{ENDPOINT}/<apiEndpoint>')
def dashboardAPIdemo(apiEndpoint):
    try:
        n=int(parseParams(['n'])['n'])
    except:
        n=20
    someData = list(range(random.randint(-20,19), random.randint(20,40)))[:n]
    random.shuffle(someData)
    return jsonify({apiEndpoint: {'data': someData }})


@app.route('/apihelp')
def apiHelp():
    req = request
    headers = req.headers.environ
    try:
        useragent = headers['HTTP_USER_AGENT']
    except:
        useragent='Guest'
    return render_template('apihelp.html', welcome=useragent)

@app.route('/favicon.ico')
def serveFavicon():
    return send_from_directory('assets', 'aladdin-globe.png')

if __name__=="__main__":
    l.info(f"Starting now")
    app.run(host=FLASK_HOST, 
            port=FLASK_PORT,
            debug=DEBUG_FLASK)