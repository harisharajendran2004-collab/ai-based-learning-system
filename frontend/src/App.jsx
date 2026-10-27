
import { useState } from "react";
import "./App.css";

const initialSubjects = [
  { id: 1, name: "Python Programming", category: "Programming", icon: "🐍", level: "Beginner", progress: 75, color: "#e8e5ff", lessons: 12 },
  { id: 2, name: "Web Development", category: "Web", icon: "🌐", level: "Intermediate", progress: 48, color: "#dff7f0", lessons: 16 },
  { id: 3, name: "Database Management", category: "Database", icon: "🗄️", level: "Beginner", progress: 62, color: "#fff0d9", lessons: 10 },
  { id: 4, name: "Artificial Intelligence", category: "AI", icon: "🤖", level: "Intermediate", progress: 25, color: "#ffe5ed", lessons: 14 },
  { id: 5, name: "Java Programming", category: "Programming", icon: "☕", level: "Beginner", progress: 35, color: "#e2efff", lessons: 12 },
  { id: 6, name: "Cloud Computing", category: "Cloud", icon: "☁️", level: "Intermediate", progress: 18, color: "#f0e7ff", lessons: 9 },
];

const quizQuestions = [
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "fun", "define"],
    answer: 1,
    subject: "Python Programming",
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "Python", "CSS", "SQL"],
    answer: 2,
    subject: "Web Development",
  },
  {
    question: "Which SQL command retrieves data from a table?",
    options: ["GET", "OPEN", "FETCH ALL", "SELECT"],
    answer: 3,
    subject: "Database Management",
  },
  {
    question: "What does AI stand for?",
    options: ["Automatic Internet", "Artificial Intelligence", "Advanced Input", "Applied Information"],
    answer: 1,
    subject: "Artificial Intelligence",
  },
  {
    question: "Which of the following is a programming language?",
    options: ["Java", "HTML only", "HTTP", "Wi-Fi"],
    answer: 0,
    subject: "Java Programming",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skilloraUser")) || null;
    } catch {
      return null;
    }
  });
  const [notice, setNotice] = useState("");
  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState(initialSubjects[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skilloraResults")) || [];
    } catch {
      return [];
    }
  });

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };

  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveUser = (nextUser) => {
    localStorage.setItem("skilloraUser", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skilloraUser");
    navigate("home");
    showNotice("You have logged out.");
  };

  const startQuiz = (subject = selectedSubject) => {
    setSelectedSubject(subject);
    setQuestionIndex(0);
    setAnswers({});
    navigate("quiz");
  };

  const submitQuiz = () => {
    const score = quizQuestions.reduce(
      (total, question, index) =>
        total + (answers[index] === question.answer ? 1 : 0),
      0
    );

    const attempt = {
      id: Date.now(),
      score,
      total: quizQuestions.length,
      percentage: Math.round((score / quizQuestions.length) * 100),
      date: new Date().toLocaleDateString(),
      subject: selectedSubject.name,
    };

    const updated = [attempt, ...results];
    setResults(updated);
    localStorage.setItem("skilloraResults", JSON.stringify(updated));

    setSubjects((old) =>
      old.map((subject) =>
        subject.id === selectedSubject.id
          ? { ...subject, progress: Math.min(100, subject.progress + 5) }
          : subject
      )
    );

    navigate("result");
  };

  const latestResult = results[0];
  const averageScore = results.length
    ? Math.round(
        results.reduce((sum, result) => sum + result.percentage, 0) /
          results.length
      )
    : 0;

  const Header = () => (
    <header className="topbar">
      <button className="brand" onClick={() => navigate("home")}>
        <span className="brand-icon">S</span>
        <span>Skillora<span className="brand-dot">.</span></span>
      </button>

      <nav className="nav-links">
        <button onClick={() => navigate("home")}>Home</button>
        {user && (
          <>
            <button onClick={() => navigate("dashboard")}>Dashboard</button>
            <button onClick={() => navigate("subjects")}>Subjects</button>
            <button onClick={() => navigate("recommendations")}>AI Learning Path</button>
          </>
        )}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <button className="profile-chip" onClick={() => navigate("profile")}>
              <span className="avatar-small">{user.name?.charAt(0).toUpperCase()}</span>
              <span>{user.name}</span>
            </button>
            <button className="button button-light" onClick={logout}>Log out</button>
          </>
        ) : (
          <>
            <button className="button button-light" onClick={() => navigate("login")}>Log in</button>
            <button className="button button-primary" onClick={() => navigate("register")}>Get started ↗</button>
          </>
        )}
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="footer">
      <button className="brand footer-brand" onClick={() => navigate("home")}>
        <span className="brand-icon">S</span>
        <span>Skillora<span className="brand-dot">.</span></span>
      </button>
      <p>Personalized learning. Meaningful progress.</p>
      <span>© {new Date().getFullYear()} Skillora · Learning for everyone.</span>
    </footer>
  );

  const HomePage = () => (
    <>
      <section className="hero section-container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="sparkle">✦</span> YOUR PERSONAL AI LEARNING GUIDE</div>
          <h1>Build skills.<br />Find your <span className="gradient-text">path.</span></h1>
          <p className="hero-description">
            A smarter way to learn. Discover your strengths, practise your
            skills, and get a learning path designed around your goals.
          </p>
          <div className="hero-buttons">
            <button className="button button-primary button-large" onClick={() => navigate("register")}>
              Start learning <span>→</span>
            </button>
            <button className="button button-outline button-large" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              Explore features ↓
            </button>
          </div>
          <div className="trust-line"><span>✓</span> Learn at your pace · Improve every day</div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow"></div>
          <div className="learning-window">
            <div className="window-top">
              <div className="window-dots"><i></i><i></i><i></i></div>
              <span>YOUR LEARNING SPACE</span>
              <span className="live-label">● Personal</span>
            </div>
            <div className="welcome-mini">
              <div className="mini-icon">✦</div>
              <div><strong>Your next chapter starts here</strong><p>Small steps make big progress.</p></div>
            </div>
            <div className="mini-progress-title"><span>Weekly learning goal</span><strong>4 / 5 hours</strong></div>
            <div className="progress-track"><div className="progress-value" style={{ width: "80%" }}></div></div>
            <div className="visual-cards">
              <div><span className="visual-emoji">📚</span><strong>Learn</strong><small>Explore topics</small></div>
              <div><span className="visual-emoji">🎯</span><strong>Practise</strong><small>Test your skills</small></div>
            </div>
            <div className="ai-tip"><span>✧</span><div><strong>Your learning tip</strong><p>Consistency beats cramming. Try 20 minutes today.</p></div></div>
          </div>
          <div className="floating-note floating-top"><span>✦</span><div><strong>Your path</strong><small>Made for you</small></div></div>
          <div className="floating-note floating-bottom"><span>↗</span><div><strong>Keep growing</strong><small>One lesson at a time</small></div></div>
        </div>
      </section>

      <section className="stats-strip section-container">
        <div><strong>Learn</strong><span>at your own pace</span></div>
        <div><strong>Practise</strong><span>with quick quizzes</span></div>
        <div><strong>Improve</strong><span>with progress insights</span></div>
        <div><strong>Grow</strong><span>with a personal path</span></div>
      </section>

      <section className="section-container features-section" id="features">
        <div className="section-heading">
          <span className="eyebrow">WHY SKILLORA?</span>
          <h2>Your goals. <span className="gradient-text">Your learning journey.</span></h2>
          <p>Everything you need to turn learning into a daily habit.</p>
        </div>
        <div className="feature-grid">
          {[
            ["✧", "Personal learning paths", "Get suggested topics based on your interests and quiz results."],
            ["▤", "Focused practice", "Test your understanding with short multiple-choice quizzes."],
            ["◔", "Progress insights", "See your quiz scores and learning progress in one place."],
            ["✦", "Smart recommendations", "Find topics to revise and choose your next learning step."],
          ].map(([icon, title, description]) => (
            <article className="feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="feature-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section section-container">
        <div><span className="eyebrow">YOUR NEXT STEP</span><h2>Make learning work for you.</h2><p>Start with one topic. Build confidence with every lesson.</p></div>
        <button className="button button-white button-large" onClick={() => navigate("register")}>Create your account →</button>
      </section>
    </>
  );

  const AuthPage = ({ register = false } = {}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("Computer Science");
    const [goal, setGoal] = useState("Improve my technical skills");

    const handleSubmit = (event) => {
      event.preventDefault();

      if (!email.trim() || !password.trim()) {
        showNotice("Please enter your email and password.");
        return;
      }

      if (register && !name.trim()) {
        showNotice("Please enter your name.");
        return;
      }

      if (password.length < 6) {
        showNotice("Password must contain at least 6 characters.");
        return;
      }

      const nextUser = {
        name: register ? name.trim() : email.split("@")[0],
        email: email.trim(),
        course,
        goal,
      };

      saveUser(nextUser);
      navigate("dashboard");
      showNotice(register ? "Welcome to Skillora! Your profile is ready." : "Welcome back!");
    };

    return (
      <section className="auth-layout">
        <div className="auth-side">
          <div className="auth-side-symbol">✦</div>
          <h2>Learning is a journey.<br /><span className="gradient-text">Let's make it yours.</span></h2>
          <p>Build better habits, discover your strengths, and take the next step with confidence.</p>
          <div className="auth-benefits"><span>✓ Personal learning goals</span><span>✓ Practice quizzes</span><span>✓ Progress tracking</span></div>
        </div>
        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-icon">{register ? "✦" : "↗"}</div>
          <h1>{register ? "Create your account" : "Welcome back"}</h1>
          <p className="auth-subtitle">{register ? "Start building your personalised learning path." : "Sign in and continue your learning journey."}</p>

          {register && (
            <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" autoComplete="name" required /></label>
          )}

          <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" autoComplete={register ? "new-password" : "current-password"} minLength={6} required /></label>

          {register && (
            <>
              <label>Your course
                <select value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option>Computer Science</option><option>MCA</option><option>BCA</option><option>B.Sc Computer Science</option><option>Other</option>
                </select>
              </label>
              <label>Your learning goal
                <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                  <option>Improve my technical skills</option><option>Prepare for interviews</option><option>Learn programming</option><option>Explore AI</option>
                </select>
              </label>
            </>
          )}

          <button className="button button-primary auth-submit" type="submit">{register ? "Create account →" : "Log in →"}</button>
          <p className="auth-switch">{register ? "Already have an account?" : "New to Skillora?"} <button type="button" onClick={() => navigate(register ? "login" : "register")}>{register ? "Log in" : "Create account"}</button></p>
          <p className="demo-note">Demo version · Authentication will be connected to the backend later.</p>
        </form>
      </section>
    );
  };

  const DashboardPage = () => {
    const completedQuizzes = results.length;
    const progressAverage = Math.round(subjects.reduce((sum, item) => sum + item.progress, 0) / subjects.length);

    return (
      <main className="app-page">
        <div className="page-title-row"><div><span className="eyebrow">YOUR OVERVIEW</span><h1>Welcome back, {user?.name || "Learner"} 👋</h1><p>Every step forward counts. Let's keep your momentum going.</p></div><button className="button button-primary" onClick={() => navigate("subjects")}>Continue learning →</button></div>

        <section className="dashboard-welcome">
          <div><span className="welcome-tag">✦ YOUR PERSONAL LEARNING SPACE</span><h2>Make today a little smarter.</h2><p>Pick a topic, practise a skill, and move one step closer to your goals.</p><button className="button button-white" onClick={() => startQuiz()}>Take a quick quiz →</button></div>
          <div className="welcome-art">📚<span>✦</span></div>
        </section>

        <section className="metric-grid">
          <Metric icon="📘" label="Subjects" value={subjects.length} note="Available to explore" />
          <Metric icon="🎯" label="Quizzes taken" value={completedQuizzes} note="Your practice history" />
          <Metric icon="📈" label="Average score" value={`${averageScore}%`} note={results.length ? "Based on your attempts" : "Take your first quiz"} />
          <Metric icon="✨" label="Overall progress" value={`${progressAverage}%`} note="Across all subjects" />
        </section>

        <section className="content-grid">
          <div className="panel">
            <div className="panel-heading"><div><h2>Continue learning</h2><p>Pick up where you left off.</p></div><button className="text-link" onClick={() => navigate("subjects")}>All subjects →</button></div>
            <div className="subject-list">
              {subjects.slice(0, 4).map((subject) => (
                <div className="subject-row" key={subject.id}>
                  <div className="subject-icon" style={{ background: subject.color }}>{subject.icon}</div>
                  <div className="subject-details"><strong>{subject.name}</strong><div className="progress-track"><div className="progress-value" style={{ width: `${subject.progress}%` }}></div></div><small>{subject.progress}% complete</small></div>
                  <button className="small-action" onClick={() => { setSelectedSubject(subject); navigate("subjects"); }}>Open →</button>
                </div>
              ))}
            </div>
          </div>

          <div className="panel recommendation-panel">
            <div className="recommendation-symbol">✦</div><span className="eyebrow">SUGGESTED NEXT STEP</span><h2>Build your skills in {subjects.reduce((lowest, item) => item.progress < lowest.progress ? item : lowest, subjects[0]).name}</h2><p>Start with the basics, practise a few questions, and review the topics you find challenging.</p>
            <button className="button button-primary" onClick={() => navigate("recommendations")}>View learning path →</button>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading"><div><h2>Quick actions</h2><p>What would you like to do today?</p></div></div>
          <div className="quick-action-grid">
            <button onClick={() => navigate("subjects")}><span>📚</span><strong>Explore subjects</strong><small>Find a topic to study</small></button>
            <button onClick={() => startQuiz()}><span>🎯</span><strong>Take a quiz</strong><small>Check your knowledge</small></button>
            <button onClick={() => navigate("progress")}><span>📊</span><strong>View progress</strong><small>Review your results</small></button>
            <button onClick={() => navigate("recommendations")}><span>✨</span><strong>Learning path</strong><small>Plan your next steps</small></button>
          </div>
        </section>
      </main>
    );
  };

  const Metric = ({ icon, label, value, note }) => (
    <article className="metric-card"><span className="metric-icon">{icon}</span><span className="metric-label">{label}</span><strong className="metric-value">{value}</strong><small>{note}</small></article>
  );

  const SubjectsPage = () => {
    const categories = ["All", ...new Set(subjects.map((subject) => subject.category))];
    const filteredSubjects = subjects.filter((subject) => {
      const matchesSearch = subject.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || subject.category === category;
      return matchesSearch && matchesCategory;
    });

    return (
      <main className="app-page">
        <div className="page-title-row"><div><span className="eyebrow">EXPLORE AND GROW</span><h1>Find your next skill.</h1><p>Choose a subject that matches your interests and goals.</p></div><div className="page-title-icon">📚</div></div>
        <div className="subject-toolbar"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search subjects..." aria-label="Search subjects" /><div className="filter-buttons">{categories.map((item) => <button key={item} className={category === item ? "filter-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
        <div className="subject-catalog">
          {filteredSubjects.map((subject) => (
            <article className="catalog-card" key={subject.id}>
              <div className="catalog-card-top"><span className="catalog-icon" style={{ background: subject.color }}>{subject.icon}</span><span className="level-pill">{subject.level}</span></div>
              <h2>{subject.name}</h2><p>{subject.lessons} learning modules to explore at your own pace.</p>
              <div className="catalog-progress-label"><span>Your progress</span><strong>{subject.progress}%</strong></div>
              <div className="progress-track"><div className="progress-value" style={{ width: `${subject.progress}%` }}></div></div>
              <div className="catalog-card-footer"><span>{subject.progress === 100 ? "Completed" : `${subject.progress}% complete`}</span><button className="button button-primary" onClick={() => { setSelectedSubject(subject); startQuiz(subject); }}>Practise →</button></div>
            </article>
          ))}
          {filteredSubjects.length === 0 && <div className="empty-state"><span>🔎</span><h3>No subjects found</h3><p>Try another search or category.</p></div>}
        </div>
      </main>
    );
  };

  const QuizPage = () => {
    const question = quizQuestions[questionIndex];
    const selectedAnswer = answers[questionIndex];

    return (
      <main className="quiz-layout">
        <div className="quiz-top-row"><button className="back-link" onClick={() => navigate("subjects")}>← Back to subjects</button><span className="level-pill">PRACTICE QUIZ</span></div>
        <div className="quiz-card">
          <div className="quiz-card-header"><div><span className="eyebrow">{selectedSubject.name}</span><h1>Test your understanding.</h1><p>Choose the best answer for each question.</p></div><div className="quiz-count">{questionIndex + 1}<span> / {quizQuestions.length}</span></div></div>
          <div className="quiz-progress-track"><div className="progress-value" style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }}></div></div>
          <div className="question-label">QUESTION {questionIndex + 1}</div><h2 className="question-text">{question.question}</h2>
          <div className="answer-list">
            {question.options.map((option, index) => (
              <button key={option} className={`answer-option ${selectedAnswer === index ? "answer-selected" : ""}`} onClick={() => setAnswers((old) => ({ ...old, [questionIndex]: index }))}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="answer-check">{selectedAnswer === index ? "✓" : ""}</span></button>
            ))}
          </div>
          <div className="quiz-footer"><span>{Object.keys(answers).length} of {quizQuestions.length} answered</span>{questionIndex > 0 && <button className="button button-light" onClick={() => setQuestionIndex((i) => i - 1)}>← Previous</button>}{questionIndex < quizQuestions.length - 1 ? <button className="button button-primary" onClick={() => setQuestionIndex((i) => i + 1)}>Next question →</button> : <button className="button button-primary" onClick={submitQuiz}>Submit quiz ✓</button>}</div>
        </div>
        <p className="quiz-footnote">Take your time. Learning is about understanding, not just scores.</p>
      </main>
    );
  };

  const ResultPage = () => {
    if (!latestResult) {
      return <main className="app-page empty-state"><span>📊</span><h1>No quiz results yet</h1><p>Complete a quiz to see your performance analysis.</p><button className="button button-primary" onClick={() => startQuiz()}>Take your first quiz →</button></main>;
    }

    const passed = latestResult.percentage >= 60;
    return (
      <main className="result-layout">
        <div className="result-hero"><div className="result-badge">{passed ? "✦" : "↗"}</div><span className="eyebrow">QUIZ COMPLETED</span><h1>{passed ? "Great work!" : "Keep practising!"}</h1><p>Every attempt helps you understand a little more.</p><div className="score-circle" style={{ "--score": `${latestResult.percentage * 3.6}deg` }}><div><strong>{latestResult.percentage}%</strong><span>Your score</span></div></div><p className="result-score-text">You answered <strong>{latestResult.score} out of {latestResult.total}</strong> questions correctly.</p></div>
        <div className="result-details-grid"><article className="metric-card"><span className="metric-label">Subject</span><strong className="result-detail-value">{latestResult.subject}</strong></article><article className="metric-card"><span className="metric-label">Correct answers</span><strong className="result-detail-value">{latestResult.score}/{latestResult.total}</strong></article><article className="metric-card"><span className="metric-label">Attempt date</span><strong className="result-detail-value">{latestResult.date}</strong></article></div>
        <section className="panel result-advice"><div><span className="eyebrow">YOUR NEXT STEP</span><h2>{passed ? "Build on this progress." : "Review and try again."}</h2><p>{passed ? "You have a good start. Keep practising to strengthen your understanding." : "Revisit the basics, review each answer, and try another practice session."}</p></div><button className="button button-primary" onClick={() => navigate("recommendations")}>View learning path →</button><button className="button button-light" onClick={() => startQuiz()}>Try again</button></section>
      </main>
    );
  };

  const RecommendationsPage = () => {
    const weakest = [...subjects].sort((a, b) => a.progress - b.progress).slice(0, 3);
    return (
      <main className="app-page">
        <div className="page-title-row"><div><span className="eyebrow">YOUR PERSONAL PLAN</span><h1>Your learning path ✨</h1><p>Suggested next steps based on the progress recorded in this demo.</p></div><div className="page-title-icon">🧭</div></div>
        <section className="path-banner"><div className="path-banner-icon">✦</div><div><span className="eyebrow">A PLAN THAT STARTS SMALL</span><h2>Learn a little. Practise a little. Repeat.</h2><p>Follow these steps to build a consistent learning habit.</p></div></section>
        <div className="path-steps">
          {[
            ["01", "Review the fundamentals", "Spend 15–20 minutes reviewing key terms and core concepts.", "10–20 min"],
            ["02", "Practise with questions", "Use a short quiz to check what you understand and what needs revision.", "5–10 min"],
            ["03", "Revisit challenging topics", "Focus on incorrect answers and make a note of confusing concepts.", "10 min"],
            ["04", "Check your progress", "Compare your recent quiz scores and choose your next learning goal.", "5 min"],
          ].map(([number, title, description, duration]) => (
            <article className="path-step" key={number}><div className="path-step-number">{number}</div><div className="path-step-content"><h3>{title}</h3><p>{description}</p><span>◷ {duration}</span></div><span className="path-step-check">○</span></article>
          ))}
        </div>
        <section className="panel"><div className="panel-heading"><div><h2>Topics to focus on</h2><p>Subjects with the lowest recorded progress.</p></div></div><div className="focus-grid">{weakest.map((subject) => <article className="focus-card" key={subject.id}><span className="catalog-icon" style={{ background: subject.color }}>{subject.icon}</span><h3>{subject.name}</h3><p>{subject.progress}% progress</p><button className="text-link" onClick={() => startQuiz(subject)}>Practise this subject →</button></article>)}</div></section>
        <p className="demo-note">These recommendations are rule-based demo suggestions. OpenAI-powered personalised recommendations will be connected when the backend is ready.</p>
      </main>
    );
  };

  const ProgressPage = () => {
    const overall = Math.round(subjects.reduce((sum, item) => sum + item.progress, 0) / subjects.length);
    return (
      <main className="app-page">
        <div className="page-title-row"><div><span className="eyebrow">YOUR LEARNING HISTORY</span><h1>Progress & insights</h1><p>Look back at your practice and celebrate each improvement.</p></div><div className="page-title-icon">📈</div></div>
        <section className="metric-grid"><Metric icon="✨" label="Overall progress" value={`${overall}%`} note="Across all subjects" /><Metric icon="🎯" label="Quizzes completed" value={results.length} note="Recorded attempts" /><Metric icon="📊" label="Average score" value={`${averageScore}%`} note="Across completed quizzes" /><Metric icon="📚" label="Subjects" value={subjects.length} note="Available subjects" /></section>
        <section className="content-grid"><div className="panel"><div className="panel-heading"><div><h2>Subject progress</h2><p>Your current learning progress.</p></div></div><div className="subject-list">{subjects.map((subject) => <div className="subject-row" key={subject.id}><div className="subject-icon" style={{ background: subject.color }}>{subject.icon}</div><div className="subject-details"><strong>{subject.name}</strong><div className="progress-track"><div className="progress-value" style={{ width: `${subject.progress}%` }}></div></div><small>{subject.progress}% complete</small></div></div>)}</div></div>
          <div className="panel"><div className="panel-heading"><div><h2>Recent quiz attempts</h2><p>Your latest recorded results.</p></div></div>{results.length ? <div className="attempt-list">{results.slice(0, 6).map((result) => <div className="attempt-row" key={result.id}><span className="attempt-icon">✓</span><div><strong>{result.subject}</strong><small>{result.date} · {result.score}/{result.total} correct</small></div><strong className="attempt-score">{result.percentage}%</strong></div>)}</div> : <div className="empty-inline"><span>📝</span><p>No attempts yet. Your first quiz will appear here.</p><button className="text-link" onClick={() => startQuiz()}>Take a quiz →</button></div>}</div></section>
      </main>
    );
  };

  const ProfilePage = () => (
    <main className="app-page profile-layout">
      <div className="page-title-row"><div><span className="eyebrow">YOUR ACCOUNT</span><h1>My profile</h1><p>Review your learning details.</p></div></div>
      <section className="profile-card"><div className="profile-avatar">{user?.name?.charAt(0).toUpperCase() || "S"}</div><h2>{user?.name || "Learner"}</h2><p>{user?.email}</p><div className="profile-info-grid"><div><span>Course</span><strong>{user?.course || "Not specified"}</strong></div><div><span>Learning goal</span><strong>{user?.goal || "Build skills"}</strong></div><div><span>Quiz attempts</span><strong>{results.length}</strong></div></div><button className="button button-light" onClick={logout}>Log out</button></section>
      <p className="demo-note">Profile information is stored in this browser for the frontend demo. It is not yet saved to a server or database.</p>
    </main>
  );

  const renderPage = () => {
    switch (page) {
      case "login": return <AuthPage />;
      case "register": return <AuthPage register />;
      case "dashboard": return <DashboardPage />;
      case "subjects": return <SubjectsPage />;
      case "quiz": return <QuizPage />;
      case "result": return <ResultPage />;
      case "recommendations": return <RecommendationsPage />;
      case "progress": return <ProgressPage />;
      case "profile": return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="skillora-app">
      {notice && (
        <div className="toast" role="status">
          <span>✦</span>{notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss message">×</button>
        </div>
      )}
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
