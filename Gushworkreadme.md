# Gushwork – Lead Capture & Automation System

An end-to-end lead capture and processing system that simulates a real-world production workflow using a frontend web form and n8n automation.
Could have used dummy data and tested out the workflow and submitted the assignment. But wanted to give it a Real World Scenario Feel :)


## Overview
This project is built to demonstrate how a real lead capture system works in production.
Instead of generating dummy data manually, the system captures real user input from a live webpage, processes it through an automation pipeline, validates and scores the lead, stores it, and notifies the sales team only when appropriate.

## What’s Included

- Live lead capture webpage (GitHub Pages)
- Frontend JavaScript lead capture script
- n8n workflow for lead processing
- Google Sheets integration for storage
- Email notification logic for qualified leads
- Documentation explaining architecture and decisions

## Live Demo

Lead Capture Webpage:  
https://sameermehra1505-wq.github.io/gushwork-lead-capture-demo/

Users can submit lead details via the form, which are sent in real-time to the backend automation workflow.

## System Architecture

The system follows a simple, production-style flow:

1. User submits details on the webpage
2. Frontend JavaScript sends data to an n8n webhook
3. n8n processes the lead through multiple steps:
   - Payload normalization
   - Lead validation
   - Spam detection
   - Confidence scoring
   - Status assignment
4. Leads are stored in Google Sheets
5. High-quality leads trigger an email notification to sales
6. Spam or low-confidence leads are safely ignored


## Lead Capture Script

**Location:**  
`lead-capture/lead-capture.js`

The frontend script performs the following:
- Listens for form submission
- Collects user input (name, email, phone, message)
- Adds metadata such as timestamp and source URL
- Sends the payload as JSON to an n8n webhook using a POST request

This mirrors how leads are typically captured on marketing or product websites.

## n8n Workflow

**Location:**  
`n8n/lead-capture-workflow.json`

The n8n workflow handles:
- Webhook trigger (POST)
- Payload normalization
- Lead validation checks
- Lead confidence scoring
- Lead status assignment (New Lead / Spam)
- Google Sheets storage
- Conditional routing for email notifications


## Spam Detection & Lead Scoring

Basic but practical logic is implemented to handle lead quality:

- Invalid or incomplete submissions are flagged
- Low-confidence or spam-like leads do not trigger notifications
- Only qualified leads reach the sales inbox

This prevents inbox noise and reflects real-world lead qualification practices.

## How to Test

1. Open the live demo page
2. Fill in the lead form with valid details
3. Submit the form
4. Verify:
   - Lead is stored in Google Sheets
   - Email is sent only for qualified leads
5. Test invalid or spam-like inputs to confirm filtering works

## Notes

- GitHub Pages is used to host the frontend for simplicity and accessibility
- The workflow is modular and can be extended with CRM or enrichment tools
- The design focuses on clarity, reliability, and real-world usability



