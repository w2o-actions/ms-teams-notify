const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const url             = core.getInput('webhook_url');
const summary         = core.getInput('summary');
const title           = core.getInput('title');
const subtitle        = core.getInput('subtitle');
const image           = core.getInput('image');
const status          = core.getInput('status');
const github_run_link = core.getInput('github-run-link');

let now = new Date().toISOString();
const red = 'c20000';
const green = '00b825';
let color = green;
async function postMessage() {
    try {    
      if(status!="success"){
        color = red;
      }
      const response = await axios.post(url,
        {
          "@type": "MessageCard",
          "@context": "http://schema.org/extensions",
          "themeColor": color,
          "summary": summary,
          "sections": [{
              "activityTitle": title,
              "activitySubtitle": subtitle,
              "activityImage": image,
              "facts": [{
                  "name": "Date",
                  "value": now
              }, {
                  "name": "Status",
                  "value": status
              }],
              "markdown": true
          }],
          "potentialAction": [{
              "@type": "OpenUri",
              "name": "View in GitHub",
              "targets": [{
                  "os": "default",
                  "uri": github_run_link
              }]
          }
          ]
      }
      
        );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  postMessage();