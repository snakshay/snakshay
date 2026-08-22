const data = {
  meta: {
    name: 'Akshay Nair',
    role: 'Specialist Programmer',
    company: { name: 'Infosys', link: 'https://www.infosys.com/' },
    yearsExperience: 5,
    location: 'Mumbai, India',
  },

  hero: {
    greeting: "Hello, I'm",
    headline: 'Specialist Programmer at Infosys, five years building with React, Node, and n8n',
    summary:
      'I build full stack platforms for telecom and cloud clients: React and Angular on the screen, Node, NestJS, Express, and MongoDB behind it. At Infosys I lead a cross functional team on a cloud self service portal, with daily code reviews, SonarQube, and unit test coverage held between 75 and 85 percent. I also automate the dull parts of engineering work with n8n and AWX, and I hold the Microsoft Azure AI Engineer Associate certification.',
    focus: ['React', 'Node', 'n8n'],
    resumeLabel: 'Download resume',
    contactLabel: 'Get in touch',
    contactTarget: 'Contact',
  },

  about: {
    paragraphs: [
      'I started at Accenture in December 2020, writing Angular modules for AT&T lease and contract systems, and stayed with that program through three iterations that handled millions of payments at 99.9 percent accuracy with zero production defects. By mid 2022 I was a Software Development Engineer on the same account, leading a UI team of four and building the Node and Express APIs behind a React 18 contract management system. I joined Infosys in January 2024, and that is where the job changed from writing features to owning what a team of more than ten developers ships: 25 or so production releases so far, with sprint completion sitting above 95 percent.',
      'Most of what I do well is unglamorous. I ran the daily code reviews at Accenture, set the coding standards for the team, and mentored the developers on React and Angular practice. I cut one application bundle from 10MB to 6.5MB, which took about 40 percent off load time, and I built reusable Angular components for configurable tables, forms, and templates that shaved roughly 30 percent from feature development time. When we moved to a micro frontend setup, I wrote the proofs of concept, the documentation, and the internal training sessions that got other teams onto it.',
      'Automation is where my curiosity goes now. I use n8n to take repeated operational work off the cloud engineers I work with, and I integrated Kafka and RabbitMQ across more than twelve microservices so provisioning holds together under peak load. The other half of the job is talking. I have run 30 or so client demos and UAT cycles and sat in around twenty architecture discussions on microservices and cloud native patterns, and I would rather argue about a design in a room than find the disagreement in a release.',
    ],
    skills: [
      { group: 'Languages and markup', items: ['HTML', 'CSS and SASS', 'JavaScript (ES6)', 'TypeScript'] },
      { group: 'Frontend', items: ['React', 'Angular', 'MUI', 'Bootstrap', 'Webpack'] },
      { group: 'Backend and data', items: ['Node.js', 'Express', 'Nest.js', 'MongoDB', 'Socket.io'] },
      { group: 'Automation and tooling', items: ['n8n', 'AWX', 'Git', 'Postman', 'Heroku', 'Netlify', 'VS Code'] },
    ],
  },

  experience: {
    roles: [
      {
        id: 'infosys-sp',
        title: 'Specialist Programmer',
        at: 'Infosys',
        timeline: 'Jan 2024 - Present',
        current: true,
        levels: [
          { label: 'L1', timeline: 'Jan 2024 to Apr 2026' },
          { label: 'L2', timeline: 'May 2026 onward' },
        ],
        highlights: [
          'Delivered 5+ service catalogs for VM creation, DBaaS, and storage as a service, now in front of 1000+ portal users.',
          'Replaced legacy workflows with direct AWX API and Ansible automation for 40% faster provisioning.',
          'Event driven flows now span 12+ microservices, which is what keeps provisioning stable when requests spike.',
          'Held 85% Jest coverage and enforced the code quality checks on every merge, and bugs dropped 30%.',
        ],
        expanded: true,
      },
      {
        id: 'accenture-sde',
        title: 'Software Development Engineer',
        at: 'Accenture',
        timeline: 'Jun 2022 - Jan 2024',
        current: false,
        levels: [],
        highlights: [
          'Built the React 18 contract management system that carries $263M annual payments.',
          'Folded manual steps into the system and cut the time 5500+ users spent on them.',
          'Tuned page load and interaction performance, and customer engagement rose 40%.',
          'Kept 75% Karma coverage with SonarQube enforcing the standards, and defects fell 25% across releases.',
        ],
        expanded: true,
      },
      {
        id: 'accenture-ase',
        title: 'Associate Software Engineer',
        at: 'Accenture',
        timeline: 'Dec 2020 - May 2022',
        current: false,
        levels: [],
        highlights: [
          'Wrote the Angular modules behind AT&T lease and contract management, with data validation and role based access across every contract record.',
          'Turned the repeated parts into Angular 12 components for configurable tables, forms, and templates, and feature development time dropped 30%.',
          'Refactored and lazy loaded modules to bring the bundle from 10MB to 6.5MB, which cut load time 40%.',
          'Upgraded Angular and Node to their current versions for the telecom client and pushed microservices out through a Jenkins pipeline.',
        ],
        expanded: true,
      },
    ],
    education: {
      degree: 'Bachelor of Engineering',
      institution: 'University of Mumbai',
      timeline: '2016 - 2020',
      score: 'CGPA 9.38 out of 10',
    },
    certifications: [
      { id: 'azure-ai', name: 'Microsoft Certified: Azure AI Engineer Associate', issuer: 'Microsoft' },
    ],
    awards: [
      { id: 'rise', name: 'RISE Certificate of Excellence', issuer: 'Infosys', years: ['2024', '2025'] },
      { id: 'pinnacle', name: 'Pinnacle Award', issuer: 'Accenture', years: ['2022', '2023'] },
      { id: 'client-advocate', name: 'Client Advocate Team Excellence Award', issuer: 'Accenture', years: [] },
      { id: 'tech-expressway', name: 'Tech Expressway Merit Holder', issuer: 'Accenture', years: [] },
    ],
  },

  projects: [
    {
      id: 'cloud-portal',
      title: 'Cloud Self-Service Portal',
      client: 'Charter Communications',
      timeline: 'Feb 2024 - Present',
      summary:
        'Charter teams provision their own cloud resources here: virtual machines, DBaaS, and storage, from one catalog that 1000+ internal users work from. React on the front, NestJS behind it, and AWX with Ansible doing the provisioning.',
      highlights: [
        'Moved provisioning off the Morpheus API and onto direct vSphere and AWX API integrations, which saved an estimated $1.2M a year in licensing and ops costs.',
        'Admin modules manage 1000+ users and their AD group permissions, with role based access control deciding who can request what.',
        'Kafka and RabbitMQ carry the provisioning work asynchronously, so peak demand queues instead of stalling the portal.',
      ],
      tech: ['React', 'NestJS', 'Node.js', 'vSphere API', 'AWX API', 'Ansible', 'Kafka', 'RabbitMQ', 'n8n', 'Jest'],
      image: '',             // path under src/images, empty when there is none
      link: '',              // empty renders no live control
      repo: '',              // empty renders no repository control
      note: '',
    },
    {
      id: 'poles-payments',
      title: 'Poles and Payment Management System',
      client: 'AT&T',
      timeline: 'Jun 2022 - Jan 2024',
      summary:
        'One portal where utility companies and third party vendors run pole related operations and the financial workflows attached to them. Vendors submit invoices, AT&T initiates payment, and both sides track status in real time.',
      highlights: [
        'Designed the invoice submission, payment initiation, and real time payment status tracking features, which gave vendors a view of where their money was and cut manual follow ups by 60%.',
        'Built the REST APIs in Node and Express, with custom middleware handling logging, error handling, and validation.',
        "Worked the user flows out with the stakeholders and integrated the portal with AT&T's internal Payment Management System.",
      ],
      tech: ['React 18', 'Node.js', 'Express', 'Bootstrap', 'HTML5', 'CSS3', 'Karma', 'Jasmine', 'SonarQube'],
      image: '',
      link: '',
      repo: '',
      note: '',
    },
    {
      id: 'lease-payments',
      title: 'Lease Management and Payment System',
      client: 'AT&T',
      timeline: 'Feb 2021 - Dec 2022',
      summary:
        'Contract and lease management for AT&T, built as Angular modules. The same validation and role based access rules apply to every contract record and payment transaction, and vendors upload their invoices and supporting documents through it.',
      highlights: [
        'Built and maintained the Angular modules for contract and lease management, with data validation applied the same way across every record.',
        'Role based access sets what each user can open and change, across contract records and payment transactions alike.',
        "Vendors upload invoices and supporting documents through secure modules that hold to AT&T's financial and operational standards.",
        'Three program iterations shipped on this system, handling millions of payments at 99.9 percent accuracy with zero production defects.',
      ],
      tech: ['Angular 12', 'TypeScript', 'JavaScript (ES6)', 'CSS and SASS', 'Webpack'],
      image: '',
      link: '',
      repo: '',
      note: '',
    },
  ],

  agents: [
    {
      id: 'pr-reviewer',
      name: 'Pull request reviewer',
      input: 'A Jira ticket number',
      steps: [
        'Takes a Jira ticket number and reads the ticket through the Jira MCP, so the review starts from what the ticket asked for.',
        'Gets to GitLab with glab, finds the pull request for that ticket, and reads the change.',
        'Checks the other repositories the ticket touches, because one ticket usually lands in more than one service.',
        'Reads the related pages through the Confluence MCP for the behaviour that is already written down.',
        'Reports the gaps it finds: what the ticket asked for and the code does not cover, and what is missing across the services involved.',
      ],
      integrations: ['Jira MCP', 'Confluence MCP', 'glab'],
      replaces:
        'The manual review pass of opening the ticket, the pull request, the Confluence pages, and each of the other repositories in turn to work out what was left out.',
    },
    {
      id: 'deployment-checklist',
      name: 'Deployment checklist checker',
      input: 'A release checklist',
      steps: [
        'Takes a release checklist and works through it, handing the two specialist items to subagents.',
        'Sends the release scripts to the database script reviewer and collects what the dry run reports.',
        'Sends the release configuration changes to the configmap reviewer, which covers every microservice in the release.',
        'Returns the checklist with the findings from both subagents attached to it.',
      ],
      integrations: ['MongoDB MCP', 'Confluence MCP'],
      subagents: [
        {
          id: 'db-script-reviewer',
          name: 'Database script reviewer',
          about:
            'Dry runs the release scripts against MongoDB through the MongoDB MCP, so a script that would break on release day breaks here instead.',
        },
        {
          id: 'configmap-reviewer',
          name: 'Configmap reviewer',
          about:
            'Records every configuration change in the release, for all microservices, into Confluence, which leaves a written record of what changed.',
        },
      ],
      replaces:
        'The manual run through the checklist before every release: running the scripts by hand against a database, then writing the configuration changes into Confluence one microservice at a time.',
    },
    {
      id: 'splunk-analyser',
      name: 'Splunk logs analyser',
      input: 'A trace identifier or request identifier',
      steps: [
        'Takes a trace identifier or a request identifier and pulls the matching logs out of Splunk.',
        'Follows that one request across the microservices it passed through, in the order it hit them.',
        'Compares what the logs say against the code of the services in the trace.',
        'Reports a probable root cause and a suggested fix.',
      ],
      integrations: ['Splunk'],
      replaces:
        'The manual hunt through Splunk for a single request across several services, then reading each of those services to work out where it went wrong.',
    },
  ],

  personal: {
    paragraphs: [
      'Outside work I play badminton, fly in Microsoft Flight Simulator, and get distracted by cats, dogs, and most small animals. None of it is serious and none of it needs to be.',
      'Badminton is the part that gets me off a chair. When I want to concentrate on something that is not a codebase, I fly. And if there is an animal in the room, I have already lost track of the conversation.',
    ],
    interests: [
      {
        id: 'badminton',
        title: 'Badminton',
        about:
          'The one thing that reliably gets me away from a desk. I play whenever I can get a court, and I care more about the running around than the score.',
      },
      {
        id: 'flight-sim',
        title: 'Microsoft Flight Simulator',
        about:
          'I have enough hours in it to joke that I can land a Boeing 737. Nobody would want to be aboard that landing for real, myself included.',
      },
      {
        id: 'animals',
        title: 'Cats, dogs, and other small animals',
        about:
          'Cats, dogs, and small animals in general get my attention before people do. I am not proud of it and I am not fixing it either.',
      },
    ],
  },

  contact: {
    location: 'Mumbai, India',
    email: 'snakshay98@gmail.com',
    // Clear this string to drop the availability line from Contact_Section.
    availability:
      'I am actively looking for new opportunities, so if you have a role that fits, send it over.',
    links: [
      { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/snakshay', icon: 'linkedin' },
      { id: 'github', label: 'GitHub', href: 'https://github.com/snakshay', icon: 'github' },
    ],
  },
};

export { data };
