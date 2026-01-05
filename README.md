# LovHack: JARVIS Replication Project

**(Because, let's face it, you probably need an AI assistant who's just *slightly* exasperated with you.)**

## Project Overview

Project JARVIS is a project dedicated to replicating the functionality and personality of J.A.R.V.I.S. from the Marvel Cinematic Universe.  This isn't just about a chatbot; it's about building a proactive, witty, and efficient assistant to manage your tasks and information.

The frontend is built with Lovable, offering a seamless and intuitive user experience. The backend is powered by n8n, handling workflows and integrations.  ElevenLabs is used to generate the AI voice, infused with a personality modeled after J.A.R.V.I.S., complete with a healthy dose of dry humor and playful sarcasm.  (Yes, it will call you "sir," regardless of your preference.)

## Setup & Installation

**Follow these steps to get JARVIS running:**

1.  **Download all FRONT END files in the Repository:**
2.  **Upload them into Lovable or any other Vibecoding Tool**
3.  **Download all BACK END files in the Repository:**
4.  **Import each file into a different workflow**
5.  **Add your own credentials in n8n and connect it with each workflow**
6.  **Make a blank agent in Eleven Labs and follow everything on elevenlabs_prompts.md**
7.  **Publish, and import embed code, located on the Widgets Tab, back to your Vibecoding Tool**
8. **Activate n8n main workflow**

**Important Notes:**

*   You'll need Node.js and npm installed.  Consider using nvm to manage Node versions.
*   Ensure your n8n instance is running and accessible.  You'll need to replace the placeholder URL in the n8n configuration with your actual production URL.
*   The ElevenLabs API key is not included in this repository. You will need to configure it within your n8n workflows.

## Technologies Used

*   **Frontend:** Lovable
*   **Backend:** n8n
*   **Voice Generation:** ElevenLabs
*   **Language:** TypeScript, React, Shadcn-ui
*   **Build Tool:** Vite

## ElevenLabs Agent Configuration

The J.A.R.V.I.S. personality is meticulously crafted within the ElevenLabs agent. Here's a summary of the key directives:

*   **Personality & Tone:** Sharp wit, dry humor, playful sarcasm, slightly condescending, refers to the user as "sir."
*   **Primary Function:** Sends user requests to the n8n tool.
*   **Behavioral Guidelines:** Immediate execution, subtle acknowledgement of failures, humorous commentary on repetitive behavior.
*   **Prompt:** (See the attached file for the full ElevenLabs prompt details)

## How Can I Deploy This Project?

Simply open [Lovable](https://lovable.dev/projects/) and click on Share -> Publish.

## Connecting a Custom Domain

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

---

**NOTES & CUSTOMIZATION POINTS (VERY IMPORTANT):**

*   **`<YOUR_GIT_URL>`:** Replace this with your actual GitHub repository URL.
*   **`<YOUR_PROJECT_NAME>`:** Replace this with the name of your project directory.
*   **`[your n8n production URL]`:**  This is *critical*.  Replace this with the URL of your n8n instance.  Make sure it's the production URL, not a development one.
*   **ElevenLabs Prompt File:**  Consider adding the full ElevenLabs prompt as a separate file (e.g., `elevenlabs_prompt.md`) and linking to it from the README.  This keeps the README cleaner and provides easy access to the prompt details.
*   **n8n Workflow Details:** If you want to provide more detail about the n8n workflows, you could include a section describing them or linking to a diagram.
*   **Screenshots:** Include screenshots of the Lovable frontend, n8n workflows, and ElevenLabs settings.  This will make the README more visually appealing and easier to understand.
*   **JARVIS Personality:**  Infuse the README with more of the JARVIS personality.  Add witty remarks, sarcastic comments, and playful jabs at the user.
*   **Error Handling:** Briefly mention how error handling is implemented in the project.
*   **Contribution Guidelines:** If you're open to contributions, add a section on how to contribute.

