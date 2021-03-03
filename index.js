const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const url             = core.getInput('webhook_url');
const summary         = core.getInput('summary');
const title           = core.getInput('title');
const subtitle        = core.getInput('subtitle');
const image           = core.getInput('image');
const date            = core.getInput('date');
const status          = core.getInput('status');
const github_run_link = core.getInput('github-run-link');

const red = 'c20000';
const green = '00b825';

async function postMessage() {
    try {
      if(status="success"){
        color = green;
      }
      else{
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
                  "value": date
              }, {
                  "name": "Status",
                  "value": status
              }],
              "markdown": true
          }],
          "potentialAction": [{
              "@type": "OpenUri",
              "name": "See in GitHub",
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