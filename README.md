# Farm Activity Planner

# Project Brief
Farm Activity Planner is an AI-enhanced web application designed to help farmers organize and plan agricultural activities from land preparation through planting, crop management, and harvesting. The main audience is farmers who need a simple way to structure farm activities based on their crop, farm size, available workers, location, and planting date. I chose this idea because farm activities often need to be completed at specific stages and dates, and I wanted to apply frontend engineering and AI to a practical problem where generated plans can provide useful, structured guidance rather than functioning as a general chatbot.


## Live Application

**Live Preview:** https://farm-activity-planner.vercel.app/

**GitHub Repository:** https://github.com/sarahdama715/Farm-Activity-planner

## Project Overview

The Farm Activity Planner was developed as a production-ready AI-enhanced frontend application.

The application helps farmers plan and manage agricultural activities in one place. Users can create farm activity plans and receive an AI-generated plan based on the information they provide.

The AI-generated plan considers the selected crop, farm size, workers, location, planting date, and available resources. It is designed to help the farmer understand what activities should be carried out at different stages of the farming cycle, including preparation, planting, crop management, and harvesting.

## Main Features

* Farmer registration and login
* Farmer session management
* Dashboard for viewing farm information and plans
* AI-powered farm plan generation
* Crop selection and farm details
* Planting date and farm activity planning
* Resource allocation
* Crop management
* Farm plan status tracking
* Responsive design for desktop and mobile screens
* Form validation
* Error handling for AI generation
* Idle session logout
* Accessible form controls and navigation
* Markdown rendering for AI-generated plans

## AI Integration

The application uses Google's Gemini API to generate farm activity plans.

The AI receives information such as:

* Crop type
* Farm location
* Farm size
* Number of workers
* Planting date
* Available resources

The generated response provides practical activities and recommendations for the farm.

The application also considers the relationship between the planting date and the current date. For example, when a past planting date is entered, the generated plan can continue from the expected current stage instead of asking the farmer to plant again.

The AI integration is implemented through a server-side API route:

`src/app/api/generate-plan/route.ts`

The Gemini API key is stored in an environment variable and is not committed to the repository.

## Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* Google Gemini API
* `@google/genai`
* React Markdown
* Git and GitHub
* Vercel

## Application Screens

The application includes the following main screens:

* **Dashboard** — provides an overview of the farmer's plans.
* **Generate Plan** — collects farm information and generates an AI-assisted farm plan.
* **Resource Allocation** — helps organize resources associated with farm activities.
* **Crop Management** — provides crop-related management information.
* **Settings** — provides application settings and farmer information.

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/sarahdama715/Farm-Activity-planner.git
```

### 2. Open the project

```bash
cd Farm-Activity-planner
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the Gemini API key

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your Gemini API key.

**Do not commit `.env.local` or expose the API key in the frontend.**

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

The application can be checked locally using:

```bash
npm run build
```

A successful build confirms that the application compiles correctly and that TypeScript and Next.js production checks pass.

## Testing and Quality Assurance

The application was tested before deployment and after deployment.

### AI Functionality

The Generate Plan feature was tested using different planting dates, including:

* Past planting dates
* Planting scheduled for the following day
* Future planting dates

The tests checked that the generated plan responds appropriately to the farming stage rather than repeatedly telling a farmer to perform an activity that should already have happened.

### Form Validation

The Generate Plan form was tested with incomplete information to ensure required fields are validated before submission.

### Navigation

The main application screens were tested through normal navigation and page refreshes to ensure that the application does not produce blank pages or crashes.

### Responsive Testing

The application was tested at:

* **375px** mobile viewport
* **1280px** desktop viewport

The main screens were checked for layout problems, overflowing content, navigation issues, and form usability.

### Accessibility and Performance

A production audit was performed using Google PageSpeed Insights.

Results:

| Category         |   Score |
| ---------------- | ------: |
| Performance      |  **98** |
| Accessibility    |  **95** |
| Best Practices   | **100** |
| SEO              | **100** |
| Agentic Browsing | **2/2** |

These results were obtained from the deployed application.

## Error Handling and Resilience

The application includes validation and error handling around the AI generation process.

If the AI service is temporarily unavailable or a request fails, the application handles the failure instead of allowing the entire application to crash.

The application also handles invalid form submissions through required fields and validation.

## Security

* API credentials are stored using environment variables.
* The Gemini API key is not stored directly in frontend code.
* `.env.local` is excluded from version control.
* AI requests are made through a server-side API route.

## Deployment

## Deployment

The application is deployed using Vercel.

**Production URL:**

https://farm-activity-planner.vercel.app/

The GitHub repository is connected to the Vercel deployment so that changes can be built and deployed through the repository workflow.

### Deployment Verification

After deployment, the following checks are performed:

* Production URL loads successfully.
* All main navigation routes are accessible.
* Generate Plan form loads and validates required fields.
* AI plan generation is tested with valid and invalid inputs.
* Error states are checked when an AI request cannot be completed.
* Responsive behavior is checked on mobile and desktop viewports.
* Accessibility and performance audits are reviewed after deployment.

### Rollback Procedure

If a production deployment introduces a serious problem:

1. Identify the problematic deployment in the Vercel deployment history.
2. Return the production deployment to the previous known-good version.
3. Confirm that the production URL loads correctly.
4. Re-test the main navigation and Generate Plan flow.
5. Check that AI requests and error states are working.
6. Document the issue before making a corrective change and redeploying.

### Monitoring

Production health is checked by:

* Reviewing the Vercel deployment status and build logs.
* Checking the production application after each deployment.
* Testing the Generate Plan API through the application.
* Reviewing errors reported during testing or encountered during use.
* Re-running accessibility and performance checks when significant frontend changes are made.

## Production Readiness Checklist

* [x] Main application screens implemented
* [x] Responsive layout tested
* [x] AI functionality integrated
* [x] AI-generated farm plans tested
* [x] Form validation tested
* [x] Navigation tested
* [x] Mobile viewport tested
* [x] Desktop viewport tested
* [x] Production build tested
* [x] Accessibility audit completed
* [x] Performance audit completed
* [x] Best Practices audit completed
* [x] SEO audit completed
* [x] API key stored as an environment variable
* [x] Application deployed to Vercel
* [x] GitHub repository available
* [x] Deployment verification process documented
* [x] Rollback procedure documented
* [x] Production monitoring approach documented

## Challenges and Lessons Learned

One of the main challenges during development was integrating the AI service while keeping the API key secure. The Gemini integration was placed behind a server-side API route instead of exposing the key in the browser.

Another challenge was making the AI-generated plan respond to different planting dates. The application needed to distinguish between a farm that has not yet been planted and one where planting has already taken place.

The project also provided practical experience with responsive design, accessibility testing, error handling, deployment, and testing a frontend application in a production environment.

## Future Improvements

Possible future improvements include:

* Connecting the application to a persistent database
* Adding real weather data for the selected farm location
* Adding notifications and reminders for upcoming activities
* Providing more detailed crop-specific recommendations
* Adding richer farm activity calendars
* Improving resource tracking and reporting
* Adding more detailed authentication and user account management

## License

This project was developed as part of a software engineering and AI frontend development learning project.
