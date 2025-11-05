"use client";

import resume from "../../data/resume.json";

export default function PrintPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profile, summary, coreCompetencies, experience, education, military, philosophy, projects } = resume;

  return (
    <html>
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI&apos;, Arial, sans-serif;
            background: white;
            color: #1a1a1a;
            font-size: 11pt;
            line-height: 1.5;
            padding: 0.75in;
            max-width: 7.5in;
            margin: 0 auto;
          }

          h1 {
            font-size: 32pt;
            font-weight: bold;
            text-align: center;
            margin-bottom: 8pt;
          }

          h2 {
            font-size: 13pt;
            font-weight: bold;
            color: #1a1a1a;
            margin-top: 16pt;
            margin-bottom: 8pt;
            text-transform: uppercase;
            border-bottom: 1px solid #ddd;
            padding-bottom: 4pt;
          }

          h3 {
            font-size: 11pt;
            font-weight: bold;
            color: #1a1a1a;
            margin-top: 12pt;
            margin-bottom: 4pt;
          }

          .subtitle {
            font-size: 14pt;
            text-align: center;
            color: #444;
            margin-bottom: 8pt;
          }

          .contact {
            text-align: center;
            font-size: 10pt;
            color: #444;
            margin-bottom: 16pt;
          }

          .contact a {
            color: #2563eb;
            text-decoration: none;
          }

          p {
            margin-bottom: 8pt;
            text-align: justify;
          }

          ul {
            margin-left: 20pt;
            margin-bottom: 8pt;
          }

          li {
            margin-bottom: 4pt;
          }

          .company-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4pt;
          }

          .company-name {
            font-weight: bold;
            font-size: 11pt;
          }

          .date-range {
            font-style: italic;
            color: #666;
            font-size: 10pt;
          }

          .job-title {
            font-weight: 600;
            margin-bottom: 8pt;
          }

          .highlight-box {
            background: #f5f5f5;
            border-left: 3px solid #dc2626;
            padding: 8pt;
            margin: 12pt 0;
            font-weight: 600;
          }

          .skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8pt;
            margin-bottom: 12pt;
          }

          .buy-coffee {
            text-align: center;
            margin-top: 24pt;
            padding-top: 16pt;
            border-top: 1px solid #ddd;
          }

          .buy-coffee img {
            height: 40px;
          }

          /* Page break rules for multi-page PDF */
          h2 {
            page-break-after: avoid;
            page-break-inside: avoid;
          }

          .highlight-box {
            page-break-inside: avoid;
          }

          .company-header {
            page-break-after: avoid;
          }

          section {
            page-break-inside: auto;
          }

          @media print {
            body {
              padding: 0.5in;
            }
            .buy-coffee {
              page-break-before: auto;
            }
          }
        `}</style>
      </head>
      <body>
        <h1>{profile.name.toUpperCase()}</h1>
        <div className="subtitle">{profile.title}</div>

        <div className="contact">
          {profile.location} | {profile.phone} | <a href={`mailto:${profile.email}`}>{profile.email}</a><br/>
          <a href={profile.linkedin}>LinkedIn</a> |
          <a href={profile.github}>GitHub</a> |
          <a href={`https://${profile.website}`}>{profile.website}</a>
        </div>

        <h2>Professional Summary</h2>
        {summary.split('\n\n').map((para: string, i: number) => (
          <p key={i} dangerouslySetInnerHTML={{
            __html: para
              .replace(/Pioneered Motorola's/g, '<strong>Pioneered Motorola&apos;s</strong>')
              .replace(/industry-first Certified Factory Image \(CFI\) program/g, '<strong>industry-first Certified Factory Image (CFI) program</strong>')
              .replace(/led global engineering standards adopted across 7 business units worldwide/g, '<strong>led global engineering standards adopted across 7 business units worldwide</strong>')
              .replace(/I'm not your typical IT guy\./g, '<strong>I&apos;m not your typical IT guy.</strong>')
          }} />
        ))}

        <h2>Core Competencies</h2>
        <div className="skills-grid">
          <div>
            <strong>Leadership & Innovation</strong><br/>
            {coreCompetencies.leadership}
          </div>
          <div>
            <strong>Enterprise Systems</strong><br/>
            {coreCompetencies.enterprise}
          </div>
        </div>
        <div className="skills-grid">
          <div>
            <strong>Development & Architecture</strong><br/>
            {coreCompetencies.development}
          </div>
          <div>
            <strong>Technical Stack</strong><br/>
            {coreCompetencies.technical.split('\n').map((line: string, i: number) => (
              <span key={i}>{line}<br/></span>
            ))}
          </div>
        </div>

        <h2>Professional Experience</h2>

        <div className="company-header">
          <span className="company-name">iTWerks — Elgin, IL</span>
          <span className="date-range">April 2013 – Present</span>
        </div>
        <div className="job-title">Sr. System Administrator & Infrastructure Lead</div>
        <p>
          Administer enterprise systems for 40+ small business clients, managing user provisioning, role assignments,
          permission management, and maintaining meticulous documentation of all configuration changes and system modifications.
        </p>

        <h3>Software Development & Innovation:</h3>
        <ul>
          <li>
            <strong>Architected AJ Sender: Professional WhatsApp bulk messaging platform with 2.2 MILLION LINES OF CODE</strong><br/>
            Production-ready full-stack application: React, TypeScript, Node.js, Docker deployment. Features: CSV contact upload,
            campaign management dashboard, real-time analytics, dark/light mode UI. SSL support, automated monitoring, scheduled backups,
            security (CORS, rate limiting). One-command installation with automated system optimization scripts.
          </li>
          <li>
            <strong>Built Peacock: World&apos;s first custom Model Context Protocol (MCP) server for Claude Desktop on Linux</strong><br/>
            Revolutionary AI/system integration providing filesystem access, command execution, directory browsing. Python async
            programming with security-conscious design (home directory restriction, 30-second timeouts). Industry innovation - pioneered
            custom MCP server development.
          </li>
          <li>
            <strong>Developing Pluck: Wayland-native clipboard intelligence tool in Rust</strong><br/>
            Modern architecture with workspace crates (CLI, daemon, GUI, shared components). Context-aware paste intelligence with cloud
            sync via rclone. GTK4 GUI for native Wayland experience. Demonstrates active skill development in cutting-edge systems programming.
          </li>
          <li>
            <strong>Produced complete music album in Logic Pro X</strong><br/>
            Solo composition, mixing, and mastering published on SoundCloud. Professional-grade audio engineering demonstrating technical
            depth and creative problem-solving. Contacted by music producer—demonstrates quality and commercial viability.
          </li>
        </ul>

        <h3>Systems Administration & Infrastructure:</h3>
        <ul>
          <li>Supported client audits by providing system evidence, access reports, change history, and compliance documentation—critical skills for GxP-regulated environments</li>
          <li>Implemented and maintained change control procedures ensuring all system modifications are documented, tested, and approved before deployment</li>
          <li>Designed and deployed validated system images, custom Active Directory schemas, and automated provisioning workflows</li>
          <li>Built custom Tactical RMM platform (POTA4 - Django/Vue/Go stack) for real-time server/workstation monitoring, automated patching, and proactive alerts</li>
          <li>Performed SQL Server administration including database migrations during M&A activity, integrating acquired firm data into parent environments</li>
          <li>Managed Microsoft 365 environments, DNS infrastructure (Cloudflare, MXToolBox, Google Workspace), certificate authorities, and backup/disaster recovery systems using Veeam</li>
          <li>Deployed and maintained multi-layered security with SentinelONE, multi-WAN failover firewalls (Cisco, SonicWall, Barracuda)</li>
          <li>Delivered 99.9% uptime across 40+ client environments over 11+ years</li>
        </ul>

        <div className="company-header">
          <span className="company-name">Structured Communications, Inc. & Anstar Corporation — Illinois</span>
          <span className="date-range">January 2007 – April 2013</span>
        </div>
        <div className="job-title">Project Manager</div>
        <ul>
          <li>Delivered <strong>$30M Central DuPage Hospital infrastructure rollout</strong> under budget and ahead of schedule, managing system validation, regulatory requirements, and cross-functional coordination with IT, Operations, and Quality teams</li>
          <li>Decommissioned <strong>560+ legacy servers for NYSE datacenter migration</strong> with zero downtime through phased validation, controlled transitions, and meticulous documentation</li>
          <li>Managed system documentation, change requests, and stakeholder communications across multiple business units</li>
          <li>Served as project manager for complete infrastructure buildout at <strong>IUOE Local 150&apos;s Chicago headquarters</strong> on the river</li>
        </ul>

        <div className="company-header">
          <span className="company-name">Motorola Solutions — Schaumburg, IL</span>
          <span className="date-range">January 1997 – June 2006</span>
        </div>
        <div className="job-title">Team Lead | Systems Architect | Asset Manager | Global Standards Chair</div>

        <div className="highlight-box">
          PIONEERED CERTIFIED FACTORY IMAGE (CFI) PROGRAM — INDUSTRY FIRST
        </div>
        <ul>
          <li><strong>Founded and led Motorola&apos;s Desktop Architecture team, creating the world&apos;s FIRST Certified Factory Image (CFI) program</strong></li>
          <li>Revolutionized enterprise deployment by partnering with Dell, HP, and Lenovo to pre-install Motorola&apos;s validated system images <strong>at the factory</strong> before shipping</li>
          <li>Eliminated the operational bottleneck of manually imaging thousands of machines after delivery</li>
          <li>Saved <strong>millions in labor costs and deployment time</strong> across global operations</li>
          <li>Developed comprehensive validation documentation, testing protocols, and change control procedures for factory-installed images</li>
          <li><strong>This innovation became industry standard practice and is now used by enterprises worldwide</strong></li>
        </ul>

        <div className="highlight-box">
          GLOBAL ENGINEERING STANDARDS LEADERSHIP
        </div>
        <ul>
          <li><strong>Chaired the GLOBAL HARDWARE STANDARDS COMMITTEE</strong></li>
          <li>Established hardware/software requirements adopted across <strong>7 business units worldwide</strong></li>
          <li>Authored division-wide technical specifications and procurement standards</li>
          <li>Led hardware sourcing partnerships with Dell, HP, and IBM for engineering divisions</li>
        </ul>

        <div className="highlight-box">
          DISASTER RECOVERY & COMPLIANCE
        </div>
        <ul>
          <li><strong>Authored COMPLETE DISASTER RECOVERY PLAN for Motorola&apos;s WSDD division</strong></li>
          <li>Created comprehensive DR documentation including recovery procedures, testing protocols, and validation processes</li>
          <li>Led disaster recovery planning and documentation across engineering divisions</li>
          <li>Maintained detailed audit trails for all hardware assets, leases, and system configurations</li>
        </ul>

        <div className="highlight-box">
          ADDITIONAL ACHIEVEMENTS
        </div>
        <ul>
          <li><strong>Recovered $3M in duplicate charges</strong> through meticulous system audits, cross-referencing multiple databases, and line-by-line vendor contract review</li>
          <li>Recognized with maximum bonus, stock awards, and division-wide honors</li>
          <li>Managed user access, permissions, and role assignments for engineering divisions across multiple systems and applications</li>
          <li><strong>First in program history to zero-out call queue</strong> through process optimization and efficiency improvements</li>
        </ul>

        <h2>Education & Certifications</h2>
        <div className="company-header">
          <span className="company-name">PortSwigger Web Security Academy — Remote</span>
          <span className="date-range">July 2025 – Present</span>
        </div>
        <div className="job-title">BSCP in Cybersecurity: Web Application Security (Ongoing)</div>

        <div className="company-header">
          <span className="company-name">College of DuPage — Glen Ellyn, IL</span>
          <span className="date-range">September 1992 – June 1995</span>
        </div>
        <div className="job-title">Computer Science & Business</div>

        <div className="company-header">
          <span className="company-name">United States Marine Corps — Millington, TN</span>
          <span className="date-range">April 1994 – January 1995</span>
        </div>
        <div className="job-title">Aircraft Electronics (Avionics Technician)</div>

        <h2>Military Service</h2>
        <p>
          <strong>United States Marine Corps</strong><br/>
          Rank: {military.rank}<br/>
          MOS: {military.mos}<br/>
          Service: {military.service}<br/>
          Security Clearance: {military.clearance}
        </p>

        <h2>Technical Projects</h2>
        {projects.map((project, idx) => (
          <div key={idx} style={{ marginBottom: '12pt' }}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p style={{ fontSize: '10pt', color: '#666' }}><em>{project.tech}</em></p>
          </div>
        ))}

        <h2>Professional Philosophy</h2>
        {philosophy.split('\n\n').map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}

        <div className="buy-coffee">
          <a href="https://www.buymeacoffee.com/richknowles" target="_blank" rel="noopener noreferrer">
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=richknowles&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Buy me a coffee" />
          </a>
        </div>
      </body>
    </html>
  );
}
