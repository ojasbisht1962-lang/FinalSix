import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Sparkles, MessageCircle, ArrowRight, Zap, X } from "lucide-react";
import FeatureCard from "../components/FeatureCard";

const HomePage = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [currentPromptLevel, setCurrentPromptLevel] = useState('main');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m your CareerCompass AI Assistant. I can help you with career guidance, job search tips, and information about our website. Choose a category below to get started!',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  // Nested prompt system
  const promptCategories = {
    main: [
      {
        text: "🎯 Career Planning & Direction",
        icon: "🎯",
        category: "career-planning"
      },
      {
        text: "💼 Job Search & Applications",
        icon: "💼",
        category: "job-search"
      },
      {
        text: "🎤 Interview Preparation",
        icon: "🎤",
        category: "interviews"
      },
      {
        text: "📄 Resume & LinkedIn Optimization",
        icon: "📄",
        category: "resume"
      },
      {
        text: "💰 Salary & Negotiation",
        icon: "💰",
        category: "salary"
      },
      {
        text: "📚 Skills & Professional Development",
        icon: "📚",
        category: "skills"
      },
      {
        text: "🌐 About CareerCompass Website",
        icon: "🌐",
        category: "website"
      }
    ],
    "career-planning": [
      {
        text: "How do I choose the right career?",
        response: "Choosing the right career involves several key steps:\n\n🔍 **Self-Assessment**: Identify your strengths, interests, values, and personality traits\n📊 **Market Research**: Look at job growth, salary ranges, and industry trends\n🎓 **Education Requirements**: Consider what qualifications you need vs. what you have\n⚖️ **Work-Life Balance**: Think about your lifestyle preferences and priorities\n💡 **Try Before You Commit**: Shadow professionals, volunteer, or take on projects in areas of interest\n\nOur career quiz can help you discover careers that match your profile!"
      },
      {
        text: "What careers are trending in 2025?",
        response: "Here are the hottest career fields in 2025:\n\n🤖 **AI & Machine Learning**: AI Engineers, Data Scientists, ML Specialists\n🌱 **Sustainability**: Green Energy Engineers, Environmental Consultants, Sustainability Managers\n🏥 **Healthcare**: Mental Health Professionals, Healthcare Tech Specialists, Telehealth Coordinators\n💻 **Cybersecurity**: Security Analysts, Ethical Hackers, Privacy Officers\n🎨 **Creative Tech**: UX/UI Designers, Content Creators, Digital Marketing Specialists\n📱 **Remote Work Facilitators**: Virtual Collaboration Experts, Digital Nomad Consultants\n\nThese fields offer growth, good pay, and future stability!"
      },
      {
        text: "How do I change careers successfully?",
        response: "Career change can be exciting and rewarding! Here's your roadmap:\n\n📋 **Plan Your Transition**:\n• Assess transferable skills from your current role\n• Research your target industry thoroughly\n• Build a financial cushion for the transition period\n\n🔧 **Skill Building**:\n• Take online courses, certifications, or workshops\n• Volunteer or freelance in your target field\n• Attend industry events and conferences\n\n🤝 **Network Strategically**:\n• Connect with professionals in your target field\n• Conduct informational interviews\n• Join professional associations\n\n📈 **Execute Gradually**:\n• Consider adjacent moves first\n• Update your resume to highlight relevant experience\n• Practice explaining your career change story\n\nRemember: Many successful professionals have changed careers multiple times!"
      }
    ],
    "job-search": [
      {
        text: "Where should I look for jobs online?",
        response: "Here are the best places to find job opportunities:\n\n🌟 **Major Job Boards**:\n• LinkedIn (professional networking + jobs)\n• Indeed (largest job aggregator)\n• Glassdoor (jobs + company reviews)\n• ZipRecruiter (AI-powered matching)\n\n💻 **Tech-Focused**:\n• AngelList (startups)\n• Stack Overflow Jobs (developers)\n• GitHub Jobs (tech roles)\n• Dice (IT professionals)\n\n🏢 **Company Websites**: Apply directly for better chances\n\n🤝 **Networking**:\n• Alumni networks\n• Professional associations\n• Industry conferences\n• Referrals from connections\n\n📱 **Niche Platforms**:\n• FlexJobs (remote/flexible)\n• Upwork (freelancing)\n• We Work Remotely (remote jobs)\n\nPro tip: Use multiple channels and customize applications for each role!"
      },
      {
        text: "How do I write an effective job application?",
        response: "Craft applications that get noticed:\n\n📝 **Cover Letter Strategy**:\n• Customize for each role and company\n• Start with a compelling hook\n• Show specific knowledge about the company\n• Highlight 2-3 key achievements that match job requirements\n• End with a strong call to action\n\n🎯 **Application Best Practices**:\n• Use keywords from the job description\n• Quantify your achievements with numbers\n• Show impact, not just responsibilities\n• Follow application instructions exactly\n• Apply within 24-48 hours of posting when possible\n\n✅ **Before You Submit**:\n• Proofread everything carefully\n• Ensure all documents are properly formatted\n• Check that you've answered all required questions\n• Save copies of each application for follow-up\n\nRemember: Quality over quantity - 10 tailored applications beat 50 generic ones!"
      },
      {
        text: "How long should I wait before following up?",
        response: "Follow-up timing and strategy:\n\n⏰ **Timeline**:\n• **After Application**: Wait 1-2 weeks, then send a polite follow-up\n• **After Interview**: Send thank-you email within 24 hours\n• **For Decision**: Wait 1 week after promised response date\n• **Final Follow-up**: One more attempt after 2-3 weeks\n\n📧 **Follow-up Best Practices**:\n• Keep it brief and professional\n• Reiterate your interest and key qualifications\n• Add new information if relevant (recent achievements, etc.)\n• Use the same subject line as original application\n• Send during business hours (Tuesday-Thursday, 10am-2pm)\n\n🎯 **Sample Follow-up**:\n'Hi [Name], I wanted to follow up on my application for the [Position] role. I remain very interested in the opportunity and believe my experience in [specific area] would add value to your team. Please let me know if you need any additional information. Thank you for your consideration.'\n\n⚠️ **Don't**: Be pushy, follow up too frequently, or demand immediate responses."
      }
    ],
    "interviews": [
      {
        text: "How do I prepare for common interview questions?",
        response: "Master these essential interview questions:\n\n🗣️ **The Big Four**:\n• **'Tell me about yourself'**: 2-minute professional story (past, present, future)\n• **'Why do you want this job?'**: Show research + alignment with goals\n• **'What's your biggest weakness?'**: Show self-awareness + growth\n• **'Why should we hire you?'**: Highlight unique value proposition\n\n🌟 **Behavioral Questions (STAR Method)**:\n• **Situation**: Set the context\n• **Task**: Explain your responsibility\n• **Action**: Describe what you did\n• **Result**: Share the outcome with numbers when possible\n\nExamples: 'Tell me about a time you overcame a challenge', 'Describe a leadership experience', 'How do you handle conflict?'\n\n📝 **Preparation Tips**:\n• Practice out loud, not just in your head\n• Prepare 5-7 specific examples that showcase different skills\n• Research the company thoroughly\n• Prepare thoughtful questions about the role and company culture\n\nPractice makes perfect!"
      },
      {
        text: "What should I wear to different types of interviews?",
        response: "Dress for success based on company culture:\n\n👔 **Traditional/Corporate** (Finance, Law, Consulting):\n• **Men**: Dark suit, white/light blue shirt, conservative tie, leather shoes\n• **Women**: Business suit or professional dress, closed-toe shoes, minimal jewelry\n\n💼 **Business Casual** (Most office environments):\n• **Men**: Dress shirt, slacks, blazer (optional), leather shoes\n• **Women**: Blouse with slacks/skirt, cardigan/blazer, professional flats/heels\n\n👕 **Casual/Tech** (Startups, Creative agencies):\n• **Men**: Nice jeans/chinos, polo/button-down, clean sneakers/loafers\n• **Women**: Neat jeans/pants, nice top, casual blazer, comfortable shoes\n\n📋 **General Rules**:\n• When in doubt, dress one level up from daily dress code\n• Clothes should fit well and be wrinkle-free\n• Keep accessories minimal and professional\n• Ensure good hygiene and grooming\n• Research company culture on LinkedIn/website\n\nRemember: You want them to remember your qualifications, not your outfit!"
      },
      {
        text: "How do I handle video/virtual interviews?",
        response: "Ace your virtual interview:\n\n💻 **Technical Setup**:\n• Test camera, microphone, and internet connection beforehand\n• Use a laptop/desktop (more stable than phone)\n• Have backup internet option (mobile hotspot)\n• Close unnecessary applications to prevent distractions\n• Charge devices and have chargers ready\n\n🎯 **Environment**:\n• Choose quiet, well-lit space with neutral background\n• Sit at eye level with camera (use books to adjust height)\n• Ensure good lighting on your face (avoid backlighting)\n• Remove distractions and inform household members\n\n👀 **During the Interview**:\n• Look at the camera, not the screen, when speaking\n• Keep good posture and professional body language\n• Speak slightly slower and more clearly than usual\n• Have water nearby and take brief pauses if needed\n• Keep resume and notes handy (but don't obviously read from them)\n\n🔧 **Pro Tips**:\n• Join 5-10 minutes early to test everything\n• Have interviewer's phone number as backup\n• Dress professionally from head to toe (you might need to stand)\n• Practice with friends/family beforehand\n\nTreat it like an in-person interview - professionalism still matters!"
      }
    ],
    "resume": [
      {
        text: "How do I create an ATS-friendly resume?",
        response: "Beat the robots and get your resume seen:\n\n🤖 **ATS Optimization**:\n• Use standard section headings (Experience, Education, Skills)\n• Choose simple, clean fonts (Arial, Calibri, Times New Roman)\n• Avoid fancy graphics, images, or unusual formatting\n• Use bullet points instead of tables or text boxes\n• Save as PDF and Word doc versions\n\n🔑 **Keyword Strategy**:\n• Mirror keywords from job descriptions\n• Include both acronyms and full terms (AI and Artificial Intelligence)\n• Use industry-specific terminology naturally\n• Add relevant skills in a dedicated section\n• Include location keywords if relevant\n\n📝 **Structure That Works**:\n• Contact info at top\n• Professional summary (2-3 lines)\n• Experience (reverse chronological)\n• Education\n• Skills (technical and soft skills)\n• Optional: Certifications, Projects, Languages\n\n✅ **ATS Testing**:\n• Copy/paste resume into plain text - if it's readable, ATS can parse it\n• Use online ATS checkers\n• Test with free Jobscan or similar tools\n\nRemember: ATS gets you past the first filter, but humans make hiring decisions!"
      },
      {
        text: "What are the best action verbs for my resume?",
        response: "Power up your resume with strong action verbs:\n\n💪 **Leadership & Management**:\n• Led, Directed, Supervised, Coordinated, Managed, Guided, Mentored\n• Delegated, Motivated, Influenced, Facilitated, Orchestrated\n\n📈 **Achievement & Results**:\n• Achieved, Delivered, Exceeded, Improved, Increased, Reduced, Generated\n• Boosted, Maximized, Optimized, Enhanced, Streamlined, Accelerated\n\n🔧 **Technical & Creative**:\n• Developed, Created, Designed, Built, Implemented, Engineered, Programmed\n• Innovated, Pioneered, Launched, Established, Founded, Initiated\n\n🤝 **Collaboration & Communication**:\n• Collaborated, Partnered, Negotiated, Presented, Communicated, Consulted\n• Facilitated, Mediated, Advocated, Influenced, Persuaded\n\n📊 **Analysis & Problem-Solving**:\n• Analyzed, Researched, Investigated, Evaluated, Assessed, Identified\n• Solved, Resolved, Troubleshot, Diagnosed, Strategized, Planned\n\n⚠️ **Avoid Weak Verbs**: Responsible for, Helped with, Worked on, Handled, Dealt with, Assisted\n\n💡 **Pro Tip**: Start each bullet point with a different action verb and quantify results when possible!"
      },
      {
        text: "Should I include a photo on my resume?",
        response: "Photo guidelines for different regions:\n\n🚫 **United States & Canada**: \n• **DON'T include photos** - it's actually illegal for employers to request them\n• Focus on qualifications, not appearance\n• Photos can lead to unconscious bias\n• Exception: Acting/modeling portfolios, LinkedIn profiles\n\n🌍 **Europe & Other Regions**:\n• **Germany, Austria, Switzerland**: Photos are common and expected\n• **UK, Ireland**: Generally not recommended\n• **Australia**: Not typical, can be seen as unprofessional\n• **Asia**: Varies by country - research local customs\n\n📸 **If Photo is Required/Expected**:\n• Use professional headshot\n• Neutral background\n• Professional attire\n• Smile naturally\n• High resolution, passport-style size\n• Recent photo (within 2 years)\n\n💡 **Better Alternatives**:\n• Strong LinkedIn profile with professional photo\n• Focus on accomplishments and skills\n• Include relevant certifications or portfolio links\n• Let your experience speak for itself\n\n🎯 **Remember**: Your goal is to showcase qualifications, not appearance. When in doubt, leave it out and let your skills shine!"
      }
    ],
    "salary": [
      {
        text: "How do I research salary ranges for my role?",
        response: "Get accurate salary data before negotiating:\n\n💰 **Best Salary Research Tools**:\n• **Glassdoor**: Employee-reported salaries + company reviews\n• **PayScale**: Detailed salary data by experience/location\n• **Salary.com**: Comprehensive compensation data\n• **LinkedIn Salary Insights**: Based on member data\n• **levels.fyi**: Tech industry focus with stock options\n• **Bureau of Labor Statistics**: Government data (US)\n\n📊 **Factors That Affect Salary**:\n• Geographic location (cost of living)\n• Company size and industry\n• Years of experience\n• Education and certifications\n• Specific skills and specializations\n• Company stage (startup vs established)\n\n🔍 **Research Strategy**:\n• Check multiple sources for consistency\n• Look at 25th, 50th (median), and 75th percentiles\n• Factor in total compensation (benefits, bonuses, equity)\n• Network with professionals in similar roles\n• Consider company-specific factors\n\n📝 **Documentation**:\n• Save screenshots of salary data\n• Create a compensation comparison sheet\n• Note the sources and dates of your research\n• Include benefits value in total package\n\nKnowledge is power in salary negotiations!"
      },
      {
        text: "When and how should I negotiate salary?",
        response: "Master the art of salary negotiation:\n\n⏰ **Perfect Timing**:\n• **AFTER they've made an offer** - never bring it up first\n• When they're excited about hiring you\n• Before you formally accept the position\n• During performance reviews (for current job)\n• When taking on additional responsibilities\n\n💬 **Negotiation Strategy**:\n• Express enthusiasm: 'I'm excited about this opportunity!'\n• Present your research professionally\n• Ask for 10-20% above their offer (if reasonable)\n• Focus on value you bring to the company\n• Consider the entire package, not just base salary\n\n📋 **What You Can Negotiate**:\n• Base salary\n• Signing bonus\n• Performance bonuses\n• Stock options/equity\n• Vacation time\n• Flexible work arrangements\n• Professional development budget\n• Start date\n\n🗣️ **Scripts That Work**:\n• 'Based on my research and experience, I was hoping for something closer to $X'\n• 'Can we find some middle ground on the salary?'\n• 'I'm looking at the total compensation package...'\n\n🤝 **Professional Approach**:\n• Stay positive and collaborative\n• Give them time to consider your request\n• Be prepared to justify your ask\n• Know when to accept a good offer\n• Get everything in writing"
      },
      {
        text: "What if they say the salary is non-negotiable?",
        response: "Creative alternatives when salary is fixed:\n\n🔄 **Non-Salary Benefits to Negotiate**:\n• **Extra vacation days** (easier for companies to approve)\n• **Flexible/remote work options** (valuable but low-cost)\n• **Professional development budget** (conferences, courses, certifications)\n• **Earlier performance review** (opportunity for faster raise)\n• **Signing bonus** (one-time cost vs ongoing salary)\n• **Better job title** (helps future career moves)\n• **Equipment/technology budget** (laptop, monitor, phone)\n\n📈 **Future-Focused Strategies**:\n• Negotiate salary review in 6 months instead of annually\n• Ask for clear promotion timeline and criteria\n• Request specific performance metrics for raises\n• Get equity/stock options if available\n• Negotiate tuition reimbursement\n\n💡 **Smart Responses**:\n• 'I understand the salary is fixed. Can we explore other aspects of the compensation package?'\n• 'What about opportunities for advancement and salary growth?'\n• 'Are there other benefits we could adjust?'\n\n✅ **When to Accept**:\n• Great learning opportunity\n• Strong company culture and growth potential\n• Stepping stone to bigger opportunities\n• Total package (including benefits) is competitive\n• You need the job for experience/career change\n\n🚫 **When to Walk Away**:\n• Significant underpayment for your skills\n• No room for growth or advancement\n• Poor company culture or working conditions\n\nRemember: Not everything valuable comes in your paycheck!"
      }
    ],
    "skills": [
      {
        text: "What are the most in-demand skills for 2025?",
        response: "Future-proof your career with these hot skills:\n\n🤖 **AI & Technology**:\n• **Prompt Engineering**: Crafting effective AI prompts\n• **AI Tools Proficiency**: ChatGPT, Claude, Midjourney, etc.\n• **Data Analysis**: Python, SQL, Excel, Tableau\n• **Cloud Computing**: AWS, Azure, Google Cloud\n• **Cybersecurity**: Risk assessment, incident response\n• **Automation**: Process improvement, workflow optimization\n\n🧠 **Soft Skills (Increasingly Valuable)**:\n• **Emotional Intelligence**: Self-awareness, empathy, social skills\n• **Critical Thinking**: Problem-solving, analytical reasoning\n• **Adaptability**: Learning agility, change management\n• **Communication**: Writing, presenting, active listening\n• **Leadership**: Influence, team building, decision-making\n\n🌱 **Emerging Fields**:\n• **Sustainability**: ESG reporting, green technology\n• **Mental Health**: Wellness programs, stress management\n• **Remote Collaboration**: Virtual team management\n• **Content Creation**: Video, social media, storytelling\n• **UX/UI Design**: User experience, interface design\n\n📚 **Learning Strategy**:\n• Pick 2-3 skills aligned with your goals\n• Use online platforms (Coursera, LinkedIn Learning, Udemy)\n• Practice with real projects\n• Get certified when valuable\n• Stay updated with industry trends\n\nThe key is combining technical skills with strong human skills!"
      },
      {
        text: "How do I learn new skills while working full-time?",
        response: "Maximize learning with limited time:\n\n⏰ **Time Management Strategies**:\n• **Micro-learning**: 15-30 minutes daily\n• **Commute time**: Podcasts, audiobooks, mobile apps\n• **Lunch breaks**: Short online courses or tutorials\n• **Morning routine**: 30 minutes before work\n• **Weekend blocks**: 2-3 hours for deeper learning\n\n📱 **Efficient Learning Methods**:\n• **Mobile apps**: Duolingo, LinkedIn Learning, Skillshare\n• **Podcasts**: Industry-specific shows during commute\n• **YouTube**: Quick tutorials and skill-building videos\n• **Online courses**: Coursera, Udemy, edX (self-paced)\n• **Virtual workshops**: Evening or weekend sessions\n\n🎯 **Smart Skill Selection**:\n• Choose skills relevant to your current job\n• Focus on one skill at a time\n• Pick skills that build on existing knowledge\n• Align with your career goals\n• Look for skills your company values/will pay for\n\n💡 **Workplace Learning Opportunities**:\n• Volunteer for projects requiring new skills\n• Shadow colleagues in different departments\n• Join internal training programs\n• Ask about tuition reimbursement\n• Attend company-sponsored conferences\n\n🏆 **Stay Motivated**:\n• Set specific, measurable goals\n• Track your progress visually\n• Apply skills immediately in work projects\n• Share your learning journey with others\n• Celebrate small wins along the way\n\nConsistency beats intensity - small daily efforts compound!"
      },
      {
        text: "Should I get certifications or focus on practical experience?",
        response: "Balance certifications with hands-on experience:\n\n🏅 **When Certifications Are Valuable**:\n• **Regulated industries**: IT, healthcare, finance, project management\n• **Career changes**: Proving competency in new field\n• **Technical skills**: Cloud platforms, programming languages, cybersecurity\n• **HR requirements**: Some companies require specific certifications\n• **Credibility building**: Especially for consultants/freelancers\n\n💼 **When Experience Trumps Certifications**:\n• **Creative fields**: Portfolio > certificates\n• **Sales/Marketing**: Results and case studies matter most\n• **Management roles**: Leadership experience is key\n• **Entrepreneurship**: Practical business experience\n• **Emerging fields**: Where certifications don't exist yet\n\n⚖️ **The Balanced Approach**:\n• **Start with doing**: Build projects, gain experience\n• **Certify what you know**: Validate existing skills\n• **Learn publicly**: Document your learning journey\n• **Combine both**: Use certifications to structure learning, then apply practically\n\n🎯 **High-Value Certifications for 2025**:\n• **Cloud**: AWS, Azure, Google Cloud\n• **Project Management**: PMP, Scrum Master, Agile\n• **Data**: Google Analytics, Tableau, Power BI\n• **Marketing**: Google Ads, Facebook Blueprint, HubSpot\n• **Cybersecurity**: CISSP, Security+, Certified Ethical Hacker\n\n💡 **Smart Strategy**:\n• Research what employers in your target roles actually require\n• Build projects while studying for certifications\n• Use certification study as structure for practical learning\n• Network within certification communities\n• Keep certifications current with continuing education\n\nRemember: Certifications open doors, but skills and results keep them open!"
      }
    ],
    "website": [
      {
        text: "What is CareerCompass and how does it work?",
        response: "Welcome to CareerCompass - your comprehensive career guidance platform!\n\n🧭 **What We Do**:\nCareerCompass helps you discover your ideal career path through personalized assessments, expert guidance, and AI-powered recommendations. We combine career psychology with modern technology to provide tailored career advice.\n\n🎯 **Key Features**:\n• **Career Assessment Quiz**: Comprehensive personality and skills evaluation\n• **Personalized Recommendations**: Career suggestions based on your profile\n• **AI Assistant**: 24/7 career guidance and advice (that's me!)\n• **Google Sign-In Integration**: Save your progress and access your results\n• **Quiz History**: Track your assessments and see your growth over time\n\n📊 **How It Works**:\n1. **Take Our Quiz**: Answer questions about your interests, skills, and preferences\n2. **Get Results**: Receive personalized career recommendations\n3. **Save Your Progress**: Sign in with Google to access your history\n4. **Get Ongoing Support**: Chat with our AI assistant anytime\n5. **Track Your Journey**: Monitor your career exploration over time\n\n✨ **Why Choose CareerCompass**:\n• Science-based career assessments\n• Constantly updated career information\n• User-friendly interface\n• Privacy-focused (your data is secure)\n• Free to use with premium features\n\nReady to start your career journey? Click 'Start Your Journey' to take our comprehensive career assessment!"
      },
      {
        text: "How do I take the career quiz?",
        response: "Taking our career assessment is simple and comprehensive:\n\n📝 **Getting Started**:\n• Click the 'Start Your Journey' button on our homepage\n• Or use the 'Take Career Quiz' button in the features section\n• No registration required to start, but sign in to save results!\n\n🎯 **What to Expect**:\n• **Duration**: 10-15 minutes for comprehensive results\n• **Question Types**: Multiple choice, rating scales, preference rankings\n• **Topics Covered**: Interests, skills, work values, personality traits, preferred work environment\n• **Mobile-Friendly**: Works perfectly on all devices\n\n💡 **Tips for Best Results**:\n• Answer honestly - there are no 'right' or 'wrong' answers\n• Think about your natural preferences, not what others expect\n• Consider your ideal work environment and lifestyle\n• Don't overthink - go with your first instinct\n• Complete it when you have uninterrupted time\n\n📊 **Your Results**:\n• Personalized career recommendations\n• Detailed explanation of matches\n• Skills development suggestions\n• Next steps for career exploration\n• Option to save results with Google sign-in\n\n🔄 **Retaking the Quiz**:\n• You can retake anytime to see how your preferences evolve\n• Compare results over time to track your career journey\n• Each attempt is saved in your quiz history (when signed in)\n\nRemember: This quiz is a starting point for career exploration, not a definitive life sentence. Use it as a tool to discover new possibilities!"
      },
      {
        text: "How does Google Sign-In work and is my data safe?",
        response: "Your privacy and data security are our top priorities:\n\n🔐 **Google Sign-In Benefits**:\n• **Quick & Secure**: No need to create another username/password\n• **Save Your Progress**: Access your quiz results anytime\n• **Quiz History**: Track your career exploration journey\n• **Sync Across Devices**: Access your data from any device\n• **One-Click Access**: Fast login for returning users\n\n🛡️ **Data Security**:\n• **Minimal Data Collection**: We only access your name, email, and profile picture\n• **No Password Storage**: We never see or store your Google password\n• **Secure Authentication**: Uses Google's industry-standard OAuth 2.0\n• **Encrypted Storage**: All data is encrypted and securely stored\n• **No Sharing**: We never sell or share your personal information\n\n📊 **What We Store**:\n• Your quiz responses and results\n• Timestamps of when you took assessments\n• Career recommendations generated for you\n• Basic profile info (name, email) for account management\n\n🎯 **Guest Mode Available**:\n• You can use the site without signing in\n• Take quizzes and get results immediately\n• Results won't be saved, but you can screenshot or print them\n• Perfect for trying out the platform\n\n⚙️ **Your Control**:\n• View and download your data anytime\n• Delete your account and all data if desired\n• Control what information you share\n• Revoke access through your Google account settings\n\n🔄 **How to Sign In**:\n1. Click any 'Sign In with Google' button\n2. Choose your Google account\n3. Grant permissions (you can review what we access)\n4. Start using CareerCompass with full features!\n\nQuestions about privacy? Contact us anytime - transparency is key to trust!"
      },
      {
        text: "What makes CareerCompass different from other career sites?",
        response: "CareerCompass stands out in the crowded career guidance space:\n\n🎯 **Our Unique Approach**:\n• **Holistic Assessment**: We look at personality, skills, values, AND lifestyle preferences\n• **AI-Powered Guidance**: Our chatbot provides personalized advice 24/7\n• **User-Centric Design**: Built for real people, not just algorithms\n• **Continuous Learning**: Your profile improves with each interaction\n\n🆚 **vs. Traditional Career Sites**:\n• **Beyond Job Listings**: We help you discover what you want before you search\n• **Personalized Experience**: Not one-size-fits-all advice\n• **Interactive Learning**: Engaging quizzes vs boring questionnaires\n• **Modern Interface**: Clean, mobile-friendly, intuitive design\n\n🔬 **Science-Backed Methods**:\n• Based on established career psychology theories\n• Incorporates modern workplace trends and remote work realities\n• Updated regularly with current job market data\n• Validated through user feedback and outcomes\n\n🚀 **Technology Advantages**:\n• **Fast & Responsive**: Quick loading, smooth experience\n• **Cross-Platform**: Works on all devices seamlessly\n• **Secure Authentication**: Google Sign-In for convenience and security\n• **Data Analytics**: We learn from user patterns to improve recommendations\n\n💝 **Completely Free**:\n• No hidden fees or premium subscriptions\n• Full access to all assessment tools\n• Unlimited quiz retakes and result access\n• Free AI assistant consultations\n\n🎭 **Real-World Focus**:\n• Considers work-life balance and lifestyle preferences\n• Includes emerging careers and gig economy options\n• Addresses modern workplace challenges\n• Practical, actionable advice rather than generic tips\n\nTry CareerCompass today and experience the difference personalized career guidance makes!"
      }
    ]
  };

  const handlePromptSelect = (prompt) => {
    if (typeof prompt === 'string') {
      // This is a subcategory selection
      setCurrentPromptLevel(prompt);
      const userMessage = {
        type: 'user',
        content: promptCategories.main.find(p => p.category === prompt)?.text || prompt,
        timestamp: new Date().toLocaleTimeString()
      };
      
      const aiMessage = {
        type: 'ai',
        content: `Great choice! Here are specific topics I can help you with in this area. Choose a question below:`,
        timestamp: new Date().toLocaleTimeString()
      };

      setChatMessages(prev => [...prev, userMessage, aiMessage]);
    } else {
      // This is a final prompt with response
      const userMessage = {
        type: 'user',
        content: prompt.text,
        timestamp: new Date().toLocaleTimeString()
      };
      
      const aiMessage = {
        type: 'ai',
        content: prompt.response,
        timestamp: new Date().toLocaleTimeString()
      };

      setChatMessages(prev => [...prev, userMessage, aiMessage]);
    }
  };

  const goBackToMain = () => {
    setCurrentPromptLevel('main');
    const aiMessage = {
      type: 'ai',
      content: 'Back to main menu! What would you like help with?',
      timestamp: new Date().toLocaleTimeString()
    };
    setChatMessages(prev => [...prev, aiMessage]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-100 py-20 px-4 md:px-8 text-center flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Unlock Your Potential with{" "}
            <span className="text-blue-600">CareerCompass</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover your ideal career path with our comprehensive assessments and personalized guidance.
          </p>
          <div className="mt-8">
            <Link
              to="/quiz"
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Your Path to Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-blue-600" />}
              title="Personalized Assessment"
              description="Take our comprehensive quiz to discover careers that match your skills, interests, and values."
              link="/quiz"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-green-600" />}
              title="Career Guidance"
              description="Get expert advice on career paths, skill development, and industry insights."
              link="/career-guidance"
            />
            <FeatureCard
              icon={<MessageCircle className="h-8 w-8 text-purple-600" />}
              title="AI Assistant"
              description="Chat with our AI-powered career counselor for instant, personalized advice."
              action={() => setShowChatbot(true)}
            />
          </div>
        </div>
      </div>

      {/* CTA Section with Embedded Chatbot */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands who have discovered their dream careers with CareerCompass
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/quiz"
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                Take Career Quiz
              </Link>
              <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                {showChatbot ? 'Hide AI Assistant' : 'Chat with AI Assistant'}
              </button>
            </div>
          </div>

          {/* Embedded Chatbot Interface */}
          {showChatbot && (
            <div className="mt-8 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 max-w-4xl mx-auto overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bot className="h-8 w-8" />
                    <div>
                      <h3 className="text-xl font-bold">CareerCompass AI Assistant</h3>
                      <p className="text-blue-100 text-sm">Your personal career guidance counselor</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChatbot(false)}
                    className="hover:bg-white/20 p-2 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row max-h-96">
                {/* Chat Messages */}
                <div className="lg:w-2/3 p-6 bg-gray-50 overflow-y-auto" style={{ maxHeight: '400px' }}>
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-sm lg:max-w-md px-4 py-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white ml-12'
                              : 'bg-white text-gray-800 mr-12 shadow-sm border'
                          }`}
                        >
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                          <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prompt Selection Panel */}
                <div className="lg:w-1/3 p-6 bg-white border-l border-gray-200">
                  <div className="space-y-4">
                    {currentPromptLevel !== 'main' && (
                      <button
                        onClick={goBackToMain}
                        className="w-full text-left p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                        Back to Main Menu
                      </button>
                    )}
                    
                    <div className="text-sm text-gray-600 font-medium mb-3">
                      {currentPromptLevel === 'main' ? 'Choose a category:' : 'Select a topic:'}
                    </div>
                    
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {promptCategories[currentPromptLevel]?.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handlePromptSelect(prompt.category || prompt)}
                          className="w-full text-left p-3 rounded-lg border transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 text-sm group"
                        >
                          {prompt.text ? (
                            <div>
                              <div className="font-medium text-gray-800 group-hover:text-blue-700 flex items-center gap-2">
                                <span>{prompt.icon}</span>
                                {prompt.text}
                              </div>
                            </div>
                          ) : (
                            <div className="font-medium text-gray-800 group-hover:text-blue-700">
                              {prompt.text}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Chatbot Button (appears when chatbot is closed) */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 flex items-center gap-2"
        >
          <Bot className="h-6 w-6" />
          <span className="hidden sm:inline font-medium">Career Assistant</span>
          <ArrowRight className="h-5 w-5 ml-3 transition-transform duration-300 animate-bounce" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
