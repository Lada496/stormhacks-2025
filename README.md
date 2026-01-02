# JobQuest AI

## Inspiration
Everyone knows that searching and applying for internships is an endless grind. From tweaking resumes to pass the ATS check, to the constant preparations needed leading up to behavioural and technical interviews, we recognize that it can be a very stressing (and sometimes, demoralizing!) experience. Thus, we wanted to improve the job hunt experience in an innovative and stimulating way. Rather than treating it like a tiring chore, we came up with a solution that we believe is fun, interactive, enjoyable and efficient: **JobQuest AI**.

## What it does
**JobQuest AI** is an AI-powered web application that aims to help job seekers prepare for their applications in a gamified way.

### Resume Match & Feedback
We give the user multiple "quest" options that they can partake in. One of which is a Resume Match. It prompts the user to upload a PDF version of their resume, followed by the job description. With **AWS Bedrock**, it analyzes both, generating an accurate match score alongside specific, actionable improvements on how to tailor your resume to better match the posting requirements.

### Mock Behavioral Interviews
The second "quest" option that we provide through our application is a Mock Interview (Behavioural). Once the resume has been refined through our Resume Matching feature, you can also practice a mock interview question using the same job posting. Powered by **ElevenLabs**, it delivers an assortment of interview questions in a natural, human-sounding voice that the user can respond to, giving them both integral practice required to answer questions, and get accustomed to interview pacing.

Together, these features combine to create an enhanced, gamified experience for the user. As the user continues to use our functionalities, it also helps "level up" the user, showcased through the main page. Any achievements they made through our application (i.e., continuing a usage streak, completing a set number of mock interviews, etc.) will be awarded through visually-appealing aesthetics such as badges.

## How we built it

### Next.js (Front-end/User interface)
The app's UI was developed using **Next.js**. Given that most of our members did have experience in React, we wanted to try out Next.js due to its additional capabilities in server-side rendering and simplified routing processes.

### ElevenLabs (Voice recognition)
**ElevenLabs** was an ideal solution for one of our stand-out features. As an AI voice generator, we hoped to utilize its incredible functionalities for our mock practice interviews. We appreciated its usage of natural, human-sounding voices, and fast response times during the interviews, which is necessary for an interactive practice session. This ensures that the mock practices are an immersive experience that helps users get accustomed to interview environments, granting them a safe space to practice their answers.

### AWS Bedrock (Generative AI)
As a whole, **Amazon Web Services** is a robust cloud-based service. While we did want to integrate other features from AWS such as DynamoDB, we primarily aimed to use AWS to test out AI integration — more specifically, **AWS Bedrock**. Put simply, Bedrock permits us to select from various foundation models from various providers through a single API, simplifying the process of creating generative AI chatbots. Using this solution means that we do not need to create our own endpoints or AI infrastructure within the codebase.

We also planned to use **DynamoDB** to store user profiles, resume data, and keep track of user progress (levels, badges, interview history) so user data could persist over time. Given the event’s time limit, we focused on the core AI and voice features first. However, with Amazon Web Services, it makes future integrations and application scaling easier.

## Challenges we ran into
- **Git Merge Conflicts:** Some of our members had varied levels of Git/GitHub proficiency. We encountered occasional merge conflicts when integrating features, which were resolved efficiently. We were also able to make use of branching to work on our MVP's required features and perform PRs.
- **AWS Bedrock Set-up and Integration:** Integrating the generative AI agent with our client-side logic was challenging. Fortunately, we were able to get some assistance through mentorship and gen AI.
- **ElevenLabs:** WebSockets were a bit tricky to understand and to handle their behaviour safely in our codebase. Adding a client tool for the agent to call and send a response for the front end to respond to was also tricky and was ultimately something we had to abandon. Finally, our agent began failing spontaneously and we were scrambling for a little bit to triangulate the issue before we realized that our ElevenLabs subscription had run out of tokens!

## Accomplishments that we're proud of
- **Successful AWS Bedrock usage:** We were eventually able to connect the Bedrock backend with our frontend, and it was able to successfully generate a comprehensive, detailed review of submitted resumes and also provided relevant feedback.
- **ElevenLabs integration:** The basic functionality was quite easy and fun to set up! The tool itself seems to be incredibly powerful with a huge number of potential use cases, one of which is demonstrated in our project.

## What we learned
We learned a LOT this past weekend!

- **Technical skills:** We learnt many different tech stacks that we were previously not exposed to, such as **AWS Bedrock, ElevenLabs, and Next.js**. Despite this being our first attempt at using some of these development tools, it sparked our curiosity in utilizing these in the near future for our own personal projects.
- **Soft skills:** We learnt how to communicate effectively within a team and learnt how to utilize **Agile work methodologies** to revise our development strategy. Through collaborative efforts, we were able to also make use of each other's strengths, ranging from frontend development to backend/API integration and AWS experience to create a working MVP that we believe many individuals can benefit from.

## What's next for JobQuest AI
- **Technical Interview Quests:** Technical questions are also an important component to all job interviews. As such, we hope to include a Technical Interview Quest in the future, especially for roles that often have technical portions (i.e., software development and live-coding challenges; bio-related roles and troubleshooting equipment/assays).
- **More Resume Features:** Our Resume Review functionality currently includes assessing the resume content quality, matching keywords, and tailored feedback. However, we'd like to add scores for Formatting and Overall Impact. This can then give a more specific score for the user.
- **Database Integration and User Authentication:** Eventually, we'd like to use AWS for a fully operating backend cloud-based server. This would include user authentication, and maintaining data persistence to keep track of user-specific data with AWS' DynamoDB.

## Built With
- amazon-web-services  
- bedrock  
- css3  
- elevenlabs  
- html  
- javascript  
- next.js

## Link
https://devpost.com/software/jobquest-ai-7ri3sb
