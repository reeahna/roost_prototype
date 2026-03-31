import { useState } from "react";

const COLORS = {
  clay: "#C4704F", blush: "#F2D4C8", teal: "#2A5F6E",
  sand: "#F5EDE6", charcoal: "#2C2C2C", mist: "#E8F0F2",
};

const CATEGORY_COLORS = {
  "Outdoors": "#2A5F6E", "Alumni": "#5A8A6E", "Arts & Culture": "#9B6B8A",
  "Food & Drink": "#C4704F", "Social": "#7B6FA0", "Fitness": "#3A7A5E",
  "Shopping": "#C4704F", "Technology": "#4A6FA0", "Music": "#7B4F8A",
};

const EMOJIS = ["🥾","📚","🎓","🍳","🚴","🎨","🧠","🏺","🏃","🎵","💻","🌿","🎭","🏊","☕"];

const initGroups = [
  { id: 1, name: "Young Professionals Hiking Club", category: "Outdoors", distance: "1.2 mi", members: 34, nextEvent: "Sat, Mar 7 • 9am", mutuals: 2, mutualNames: ["Bea G.", "Alex M."], emoji: "🥾", color: "#2A5F6E", tags: ["hiking", "outdoors", "fitness"] },
  { id: 2, name: "Sunday Morning Book Club", category: "Arts & Culture", distance: "0.4 mi", members: 18, nextEvent: "Sun, Mar 8 • 10am", mutuals: 1, mutualNames: ["Jordan K."], emoji: "📚", color: "#C4704F", tags: ["books", "reading", "coffee"] },
  { id: 3, name: "IU Alumni Network – Chicago", category: "Alumni", distance: "2.1 mi", members: 127, nextEvent: "Thu, Mar 12 • 7pm", mutuals: 5, mutualNames: ["Sam R.", "Mia T.", "+3 more"], emoji: "🎓", color: "#5A8A6E", tags: ["alumni", "IU", "networking"] },
  { id: 4, name: "Monthly Cooking Class", category: "Food & Drink", distance: "0.8 mi", members: 22, nextEvent: "Fri, Mar 13 • 6:30pm", mutuals: 0, mutualNames: [], emoji: "🍳", color: "#9B6B8A", tags: ["cooking", "food", "social"] },
  { id: 5, name: "Urban Cycling Crew", category: "Outdoors", distance: "3.0 mi", members: 41, nextEvent: "Sat, Mar 14 • 8am", mutuals: 1, mutualNames: ["Chris L."], emoji: "🚴", color: "#2A5F6E", tags: ["cycling", "biking", "outdoors"] },
  { id: 6, name: "Young Professionals Art Collective", category: "Arts & Culture", distance: "1.8 mi", members: 29, nextEvent: "Wed, Mar 11 • 6pm", mutuals: 0, mutualNames: [], emoji: "🎨", color: "#9B6B8A", tags: ["art", "creative", "gallery"] },
];

const initEvents = [
  { id: 101, name: "IU Alumni Happy Hour", category: "Alumni", date: "Thu, Mar 12", time: "7:00 PM", location: "Kincade's Bar & Grill, River North", distance: "0.9 mi", going: 43, maxCapacity: null, mutuals: 5, mutualNames: ["Sam R.", "Mia T.", "+3"], emoji: "🎓", color: "#5A8A6E", tags: ["alumni", "IU", "networking"], host: "IU Alumni Network – Chicago" },
  { id: 102, name: "Waterfall Glen Morning Hike", category: "Outdoors", date: "Sat, Mar 7", time: "9:00 AM", location: "Waterfall Glen Forest Preserve", distance: "1.2 mi", going: 14, maxCapacity: 20, mutuals: 2, mutualNames: ["Bea G.", "Alex M."], emoji: "🥾", color: "#2A5F6E", tags: ["hiking", "outdoors"], host: "Young Professionals Hiking Club" },
  { id: 103, name: "Pop-Up Thrift & Vintage Fair", category: "Shopping", date: "Sun, Mar 15", time: "11:00 AM", location: "Logan Square Farmers Market", distance: "1.5 mi", going: 63, maxCapacity: null, mutuals: 3, mutualNames: ["Lea M.", "Tom S.", "Nadia B."], emoji: "🛍️", color: "#C4704F", tags: ["thrifting", "vintage", "shopping"], host: "Logan Square Community" },
  { id: 104, name: "Young Professionals Trivia Night", category: "Social", date: "Tue, Mar 10", time: "7:30 PM", location: "The Owl Bar, Wicker Park", distance: "2.3 mi", going: 28, maxCapacity: 30, mutuals: 1, mutualNames: ["Jordan K."], emoji: "🧠", color: "#7B6FA0", tags: ["trivia", "social", "bar"], host: "Chicago Post-Grads" },
  { id: 105, name: "Beginner Pottery Workshop", category: "Arts & Culture", date: "Sat, Mar 14", time: "2:00 PM", location: "Lillstreet Art Center", distance: "3.1 mi", going: 12, maxCapacity: 15, mutuals: 0, mutualNames: [], emoji: "🏺", color: "#9B6B8A", tags: ["pottery", "art", "workshop"], host: "Lillstreet Art Center" },
  { id: 106, name: "Lincoln Park 5K Fun Run", category: "Fitness", date: "Sun, Mar 8", time: "8:00 AM", location: "Lincoln Park South Pond", distance: "0.7 mi", going: 37, maxCapacity: null, mutuals: 1, mutualNames: ["Chris L."], emoji: "🏃", color: "#2A5F6E", tags: ["running", "fitness", "outdoors"], host: "Urban Cycling Crew" },
];

const groupCategories = ["All", "Outdoors", "Alumni", "Arts & Culture", "Food & Drink", "Social", "Fitness", "Technology", "Music"];
const eventCategories = ["All", "Alumni", "Outdoors", "Social", "Arts & Culture", "Fitness", "Shopping"];

function RoostApp() {
  const [activeTab, setActiveTab] = useState("discover");
  const [discoverSubTab, setDiscoverSubTab] = useState("events");
  const [groupCategory, setGroupCategory] = useState("All");
  const [eventCategory, setEventCategory] = useState("All");
  const [groups, setGroups] = useState(initGroups);
  const [events, setEvents] = useState(initEvents);
  const [joinedGroups, setJoinedGroups] = useState([3]);
  const [savedEvents, setSavedEvents] = useState([101]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createType, setCreateType] = useState("event");
  const [onboarding, setOnboarding] = useState(true);
  const [onboardStep, setOnboardStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = ["Hiking", "Reading", "Cooking", "Cycling", "Music", "Gaming", "Art", "Running", "Yoga", "Travel", "Photography", "Alumni Events"];

  const toggleJoin = (id) => setJoinedGroups((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleSave = (id) => setSavedEvents((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleInterest = (i) => setSelectedInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const addEvent = (newEvent) => {
    const id = Date.now();
    setEvents((prev) => [{ ...newEvent, id, going: 0, mutuals: 0, mutualNames: [], distance: "0.1 mi", color: CATEGORY_COLORS[newEvent.category] || COLORS.teal }, ...prev]);
    setShowCreate(false);
    setDiscoverSubTab("events");
    setActiveTab("discover");
  };

  const addGroup = (newGroup) => {
    const id = Date.now();
    setGroups((prev) => [{ ...newGroup, id, members: 1, mutuals: 0, mutualNames: [], distance: "0.1 mi", color: CATEGORY_COLORS[newGroup.category] || COLORS.teal }, ...prev]);
    setShowCreate(false);
    setDiscoverSubTab("groups");
    setActiveTab("discover");
  };

  const filteredGroups = groups.filter((g) => groupCategory === "All" || g.category === groupCategory);
  const filteredEvents = events.filter((e) => eventCategory === "All" || e.category === eventCategory);

  if (onboarding) return <OnboardingScreen step={onboardStep} setStep={setOnboardStep} interests={interests} selectedInterests={selectedInterests} toggleInterest={toggleInterest} finish={() => setOnboarding(false)} />;

  if (showCreate) return (
    <div style={styles.phone}>
      <div style={styles.statusBar}><span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span><span style={{ fontSize: 12 }}>●●● WiFi 🔋</span></div>
      <CreateScreen
        type={createType}
        setType={setCreateType}
        onClose={() => setShowCreate(false)}
        onAddEvent={addEvent}
        onAddGroup={addGroup}
        groupCategories={groupCategories}
        eventCategories={eventCategories.filter(c => c !== "All")}
      />
    </div>
  );

  if (selectedGroup) return (
    <div style={styles.phone}>
      <div style={styles.statusBar}><span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span><span style={{ fontSize: 12 }}>●●● WiFi 🔋</span></div>
      <GroupDetail group={selectedGroup} joined={joinedGroups.includes(selectedGroup.id)} onToggleJoin={() => toggleJoin(selectedGroup.id)} onBack={() => setSelectedGroup(null)} />
    </div>
  );

  if (selectedEvent) return (
    <div style={styles.phone}>
      <div style={styles.statusBar}><span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span><span style={{ fontSize: 12 }}>●●● WiFi 🔋</span></div>
      <EventDetail event={selectedEvent} saved={savedEvents.includes(selectedEvent.id)} onToggleSave={() => toggleSave(selectedEvent.id)} onBack={() => setSelectedEvent(null)} />
    </div>
  );

  return (
    <div style={styles.phone}>
      <div style={styles.statusBar}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <span style={{ fontSize: 12 }}>●●● WiFi 🔋</span>
      </div>
      <div style={styles.screen}>
        {activeTab === "discover" && (
          <DiscoverScreen
            subTab={discoverSubTab} setSubTab={setDiscoverSubTab}
            groups={filteredGroups} events={filteredEvents}
            groupCategory={groupCategory} setGroupCategory={setGroupCategory}
            eventCategory={eventCategory} setEventCategory={setEventCategory}
            joinedGroups={joinedGroups} savedEvents={savedEvents}
            onSelectGroup={setSelectedGroup} onSelectEvent={setSelectedEvent}
            onCreate={(type) => { setCreateType(type); setShowCreate(true); }}
          />
        )}
        {activeTab === "saved" && (
          <SavedScreen
            groups={groups.filter((g) => joinedGroups.includes(g.id))}
            events={events.filter((e) => savedEvents.includes(e.id))}
            onSelectGroup={setSelectedGroup} onSelectEvent={setSelectedEvent}
          />
        )}
        {activeTab === "profile" && <ProfileScreen />}
      </div>
      <nav style={styles.navBar}>
        {[{ id: "discover", icon: "🔍", label: "Discover" }, { id: "saved", icon: "⭐", label: "Saved" }, { id: "profile", icon: "👤", label: "Profile" }].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ ...styles.navBtn, color: activeTab === tab.id ? COLORS.clay : "#999", borderTop: activeTab === tab.id ? `2px solid ${COLORS.clay}` : "2px solid transparent" }}>
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ─── CREATE SCREEN ───────────────────────────────────────── */
function CreateScreen({ type, setType, onClose, onAddEvent, onAddGroup, groupCategories, eventCategories }) {
  const [form, setForm] = useState({
    name: "", category: "Outdoors", date: "", time: "", location: "",
    description: "", emoji: "🥾", hasLimit: false, maxCapacity: "",
    tags: "", nextEvent: "",
  });
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (type === "event") {
      if (!form.date.trim()) e.date = "Date is required";
      if (!form.time.trim()) e.time = "Time is required";
      if (!form.location.trim()) e.location = "Location is required";
      if (form.hasLimit && (!form.maxCapacity || parseInt(form.maxCapacity) < 1)) e.maxCapacity = "Enter a valid number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const tagsArr = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (type === "event") {
      onAddEvent({ name: form.name, category: form.category, date: form.date, time: form.time, location: form.location, emoji: form.emoji, tags: tagsArr, host: "You", maxCapacity: form.hasLimit ? parseInt(form.maxCapacity) : null });
    } else {
      onAddGroup({ name: form.name, category: form.category, emoji: form.emoji, tags: tagsArr, nextEvent: form.nextEvent || "TBD" });
    }
  };

  const spotsLeft = form.hasLimit && form.maxCapacity ? parseInt(form.maxCapacity) : null;

  return (
    <div style={{ flex: 1, overflowY: "auto", background: COLORS.sand }}>
      {/* Header */}
      <div style={{ background: COLORS.teal, padding: "20px 20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 36, height: 36, color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          <h2 style={{ color: "#fff", margin: 0, fontFamily: "Georgia, serif", fontSize: 18 }}>Create New</h2>
          <div style={{ width: 36 }} />
        </div>
        {/* Toggle event/group */}
        <div style={{ display: "flex", gap: 0, marginTop: 16, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: 4 }}>
          {[{ id: "event", label: "🗓  Event" }, { id: "group", label: "👥  Group" }].map((t) => (
            <button key={t.id} onClick={() => { setType(t.id); setErrors({}); }} style={{ flex: 1, padding: "9px 0", border: "none", borderRadius: 9, background: type === t.id ? "#fff" : "transparent", color: type === t.id ? COLORS.teal : "rgba(255,255,255,0.8)", fontWeight: 800, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 20px 40px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Emoji picker */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 16 }}>
          <Label>Icon</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div onClick={() => setEmojiOpen(!emojiOpen)} style={{ width: 52, height: 52, borderRadius: 14, background: COLORS.mist, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, cursor: "pointer", border: `2px solid ${COLORS.blush}` }}>
              {form.emoji}
            </div>
            <span style={{ fontSize: 13, color: "#999" }}>Tap to change icon</span>
          </div>
          {emojiOpen && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              {EMOJIS.map((e) => (
                <button key={e} onClick={() => { set("emoji", e); setEmojiOpen(false); }} style={{ width: 38, height: 38, borderRadius: 10, border: form.emoji === e ? `2px solid ${COLORS.clay}` : "2px solid #eee", background: form.emoji === e ? COLORS.blush : "#fff", fontSize: 20, cursor: "pointer" }}>{e}</button>
              ))}
            </div>
          )}
        </div>

        {/* Name */}
        <Field label={type === "event" ? "Event Name" : "Group Name"} error={errors.name}>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder={type === "event" ? "e.g. Saturday Farmers Market" : "e.g. Chicago Runners Club"} style={inputStyle(errors.name)} />
        </Field>

        {/* Category */}
        <Field label="Category">
          <select value={form.category} onChange={(e) => set("category", e.target.value)} style={inputStyle()}>
            {(type === "event" ? eventCategories : groupCategories.filter(c => c !== "All")).map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>

        {type === "event" && <>
          {/* Date & Time */}
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <Field label="Date" error={errors.date}>
                <input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="e.g. Sat, Mar 21" style={inputStyle(errors.date)} />
              </Field>
            </div>
            <div style={{ flex: 1 }}>
              <Field label="Time" error={errors.time}>
                <input value={form.time} onChange={(e) => set("time", e.target.value)} placeholder="e.g. 10:00 AM" style={inputStyle(errors.time)} />
              </Field>
            </div>
          </div>

          {/* Location */}
          <Field label="Location" error={errors.location}>
            <input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Millennium Park" style={inputStyle(errors.location)} />
          </Field>

          {/* Host group */}
          <Field label="Hosted By">
            <input value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Your name or group" style={inputStyle()} />
          </Field>

          {/* Capacity toggle */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.charcoal }}>Set Capacity Limit</div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Cap how many people can RSVP</div>
              </div>
              <div onClick={() => set("hasLimit", !form.hasLimit)} style={{ width: 44, height: 24, borderRadius: 12, background: form.hasLimit ? COLORS.clay : "#ddd", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                <div style={{ position: "absolute", top: 2, left: form.hasLimit ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </div>
            </div>

            {form.hasLimit && (
              <div style={{ marginTop: 14 }}>
                <Label>Max Attendees</Label>
                <input
                  type="number" min="1" value={form.maxCapacity}
                  onChange={(e) => set("maxCapacity", e.target.value)}
                  placeholder="e.g. 20"
                  style={{ ...inputStyle(errors.maxCapacity), marginTop: 6 }}
                />
                {errors.maxCapacity && <div style={{ color: "#e05", fontSize: 11, marginTop: 4 }}>{errors.maxCapacity}</div>}

                {/* Live preview of capacity badge */}
                {spotsLeft && (
                  <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: COLORS.mist, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>👀</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.teal }}>Preview — how attendees will see it:</div>
                      <CapacityBar going={0} maxCapacity={spotsLeft} preview />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>}

        {type === "group" && (
          <Field label="Next Event (optional)">
            <input value={form.nextEvent} onChange={(e) => set("nextEvent", e.target.value)} placeholder="e.g. Sat, Mar 21 • 10am" style={inputStyle()} />
          </Field>
        )}

        {/* Tags */}
        <Field label="Tags (comma separated)">
          <input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="e.g. hiking, outdoors, social" style={inputStyle()} />
        </Field>

        <button onClick={handleSubmit} style={{ padding: "16px", borderRadius: 16, border: "none", background: COLORS.clay, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer", marginTop: 4 }}>
          {type === "event" ? "Create Event 🗓" : "Create Group 👥"}
        </button>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 6, letterSpacing: 0.5 }}>{children}</div>;
}

function Field({ label, children, error }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 16 }}>
      <Label>{label}</Label>
      {children}
      {error && <div style={{ color: "#e05", fontSize: 11, marginTop: 4 }}>{error}</div>}
    </div>
  );
}

const inputStyle = (error) => ({
  width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${error ? "#e05" : "#eee"}`,
  fontSize: 14, color: COLORS.charcoal, background: COLORS.sand, outline: "none", boxSizing: "border-box",
});

/* ─── CAPACITY BAR ────────────────────────────────────────── */
function CapacityBar({ going, maxCapacity, preview = false }) {
  if (!maxCapacity) return null;
  const spotsLeft = maxCapacity - going;
  const pct = Math.min((going / maxCapacity) * 100, 100);
  const full = spotsLeft <= 0;
  const almostFull = spotsLeft <= 3 && spotsLeft > 0;
  const barColor = full ? "#e05050" : almostFull ? "#E08050" : COLORS.teal;

  return (
    <div style={{ marginTop: preview ? 6 : 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: full ? "#e05050" : almostFull ? "#E08050" : COLORS.teal }}>
          {full ? "🔴 Full — waitlist only" : almostFull ? `🟠 Only ${spotsLeft} spot${spotsLeft > 1 ? "s" : ""} left!` : `🟢 ${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} remaining`}
        </span>
        <span style={{ fontSize: 11, color: "#aaa" }}>{going}/{maxCapacity}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "#eee", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: 3, transition: "width 0.4s" }} />
      </div>
    </div>
  );
}

/* ─── DISCOVER SCREEN ─────────────────────────────────────── */
function DiscoverScreen({ subTab, setSubTab, groups, events, groupCategory, setGroupCategory, eventCategory, setEventCategory, joinedGroups, savedEvents, onSelectGroup, onSelectEvent, onCreate }) {
  return (
    <div style={{ flex: 1, overflowY: "hidden", display: "flex", flexDirection: "column", background: COLORS.sand }}>
      <div style={{ padding: "20px 20px 0", background: COLORS.sand, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, color: COLORS.clay, fontWeight: 700, fontSize: 11, letterSpacing: 1 }}>📍 CHICAGO, IL</p>
            <h2 style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 800, color: COLORS.charcoal, fontFamily: "Georgia, serif" }}>Discover 🐦</h2>
          </div>
          {/* + Create button */}
          <button onClick={() => onCreate(subTab === "events" ? "event" : "group")} style={{ background: COLORS.clay, border: "none", borderRadius: 12, padding: "8px 14px", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16 }}>+</span> {subTab === "events" ? "Event" : "Group"}
          </button>
        </div>

        <div style={{ display: "flex", gap: 0, marginTop: 14, background: "#fff", borderRadius: 14, padding: 4, boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
          {[{ id: "events", label: "🗓  Events" }, { id: "groups", label: "👥  Groups" }].map((t) => (
            <button key={t.id} onClick={() => setSubTab(t.id)} style={{ flex: 1, padding: "10px 0", border: "none", borderRadius: 10, background: subTab === t.id ? COLORS.teal : "transparent", color: subTab === t.id ? "#fff" : "#999", fontWeight: 800, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, padding: "12px 20px 4px", overflowX: "auto", flexShrink: 0 }}>
        {(subTab === "events" ? eventCategories : groupCategories).map((c) => {
          const active = subTab === "events" ? eventCategory === c : groupCategory === c;
          return <button key={c} onClick={() => subTab === "events" ? setEventCategory(c) : setGroupCategory(c)} style={{ whiteSpace: "nowrap", padding: "6px 14px", borderRadius: 20, border: "none", background: active ? COLORS.clay : "#fff", color: active ? "#fff" : COLORS.charcoal, fontWeight: 700, fontSize: 12, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", flexShrink: 0 }}>{c}</button>;
        })}
      </div>

      <div style={{ padding: "4px 20px 8px", flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: "#aaa" }}>{subTab === "events" ? `${events.length} events near you` : `${groups.length} groups near you`}</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {subTab === "events"
          ? events.map((e) => <EventCard key={e.id} event={e} saved={savedEvents.includes(e.id)} onSelect={onSelectEvent} />)
          : groups.map((g) => <GroupCard key={g.id} group={g} joined={joinedGroups.includes(g.id)} onSelect={onSelectGroup} />)
        }
      </div>
    </div>
  );
}

/* ─── EVENT CARD ──────────────────────────────────────────── */
function EventCard({ event, saved, onSelect }) {
  const dayNum = event.date.split(" ").pop();
  const dayName = event.date.split(",")[0];
  const spotsLeft = event.maxCapacity ? event.maxCapacity - event.going : null;
  const full = spotsLeft !== null && spotsLeft <= 0;

  return (
    <div onClick={() => onSelect(event)} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", cursor: "pointer", opacity: full ? 0.85 : 1 }}>
      <div style={{ background: event.color, height: 5 }} />
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ background: event.color + "18", borderRadius: 12, width: 46, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 4px", border: `1.5px solid ${event.color}30` }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: event.color, letterSpacing: 0.5 }}>{dayName.toUpperCase()}</span>
            <span style={{ fontSize: 20, fontWeight: 900, color: COLORS.charcoal, lineHeight: 1.1 }}>{dayNum}</span>
            <span style={{ fontSize: 16 }}>{event.emoji}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.charcoal, lineHeight: 1.3, flex: 1 }}>{event.name}</div>
              {full && <span style={{ background: "#fde", color: "#e05", fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 6, flexShrink: 0, marginLeft: 6 }}>FULL</span>}
            </div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>🕐 {event.time}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>📍 {event.location}</div>
            <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>by {event.host}</div>
          </div>
        </div>

        {/* Capacity bar on card */}
        {event.maxCapacity && <CapacityBar going={event.going} maxCapacity={event.maxCapacity} />}

        {!event.maxCapacity && (
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
            <Stat icon="👥" value={`${event.going} going`} />
            <Stat icon="📍" value={event.distance} />
          </div>
        )}

        {event.mutuals > 0 && (
          <div style={{ marginTop: 10, padding: "8px 10px", background: COLORS.blush + "70", borderRadius: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12 }}>🤝</span>
            <span style={{ fontSize: 11, color: COLORS.clay, fontWeight: 600 }}>{event.mutualNames.join(", ")} {event.mutuals === 1 ? "is" : "are"} going</span>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {event.tags.slice(0, 2).map((t) => <span key={t} style={{ background: COLORS.mist, color: COLORS.teal, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>#{t}</span>)}
          </div>
          {saved && <span style={{ fontSize: 12, color: COLORS.clay, fontWeight: 700 }}>★ Saved</span>}
        </div>
      </div>
    </div>
  );
}

/* ─── GROUP CARD ──────────────────────────────────────────── */
function GroupCard({ group, joined, onSelect }) {
  return (
    <div onClick={() => onSelect(group)} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", cursor: "pointer" }}>
      <div style={{ background: group.color, height: 5 }} />
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ background: group.color + "20", borderRadius: 14, width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{group.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.charcoal, lineHeight: 1.3 }}>{group.name}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{group.category}</div>
          </div>
          {joined && <span style={{ background: COLORS.teal, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8, flexShrink: 0 }}>Joined</span>}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <Stat icon="📅" value={group.nextEvent} />
          <Stat icon="👥" value={`${group.members} members`} />
          <Stat icon="📍" value={group.distance} />
        </div>
        {group.mutuals > 0 && (
          <div style={{ marginTop: 10, padding: "8px 10px", background: COLORS.blush + "70", borderRadius: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12 }}>🤝</span>
            <span style={{ fontSize: 11, color: COLORS.clay, fontWeight: 600 }}>{group.mutualNames.join(", ")} {group.mutuals === 1 ? "is" : "are"} a member</span>
          </div>
        )}
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          {group.tags.map((t) => <span key={t} style={{ background: COLORS.mist, color: COLORS.teal, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>#{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ fontSize: 11 }}>{icon}</span>
      <span style={{ fontSize: 11, color: "#777", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

/* ─── EVENT DETAIL ────────────────────────────────────────── */
function EventDetail({ event, saved, onToggleSave, onBack }) {
  const attendees = [
    { name: "Sam R.", mutual: true, school: "IU '22" },
    { name: "Mia T.", mutual: true, school: "IU '23" },
    { name: "Jordan K.", mutual: false, school: "DePaul '24" },
    { name: "Alex M.", mutual: true, school: "IU '23" },
    { name: "Chris P.", mutual: false, school: "Northwestern '23" },
  ];
  const spotsLeft = event.maxCapacity ? event.maxCapacity - event.going : null;
  const full = spotsLeft !== null && spotsLeft <= 0;

  return (
    <div style={{ flex: 1, overflowY: "auto", background: COLORS.sand }}>
      <div style={{ background: event.color, padding: "20px 20px 32px" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.25)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <div style={{ fontSize: 48 }}>{event.emoji}</div>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "10px 0 4px", fontFamily: "Georgia, serif" }}>{event.name}</h2>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>Hosted by {event.host}</div>
        </div>
      </div>

      <div style={{ margin: "0 20px", marginTop: -18, background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {[{ icon: "📅", label: event.date }, { icon: "🕐", label: event.time }, { icon: "👥", label: `${event.going} going` }].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? `1px solid ${COLORS.blush}` : "none" }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: "#777", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Capacity bar in detail */}
        {event.maxCapacity && (
          <div style={{ marginTop: 14 }}>
            <CapacityBar going={event.going} maxCapacity={event.maxCapacity} />
          </div>
        )}

        <div style={{ marginTop: 12, padding: "10px 12px", background: COLORS.mist, borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📍</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.charcoal }}>{event.location}</div>
            <div style={{ fontSize: 11, color: COLORS.teal }}>{event.distance} away</div>
          </div>
        </div>
      </div>

      {event.mutuals > 0 && (
        <div style={{ margin: "14px 20px 0", padding: "12px 14px", background: COLORS.blush, borderRadius: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 16 }}>🤝</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.clay }}>{event.mutuals} mutual{event.mutuals > 1 ? "s" : ""} going</div>
            <div style={{ fontSize: 11, color: COLORS.clay + "cc" }}>{event.mutualNames.join(", ")}</div>
          </div>
        </div>
      )}

      <div style={{ padding: "16px 20px 0" }}>
        <h3 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 800, color: COLORS.charcoal }}>Who's Going</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {attendees.slice(0, event.going > 0 ? 5 : 0).map((a, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ background: event.color, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>{a.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.charcoal }}>{a.name}</div>
                <div style={{ fontSize: 11, color: "#999" }}>{a.school}</div>
              </div>
              {a.mutual && <span style={{ background: COLORS.blush, color: COLORS.clay, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>Mutual</span>}
            </div>
          ))}
          {event.going === 0 && <div style={{ textAlign: "center", padding: "20px 0", fontSize: 13, color: "#bbb" }}>No one yet — be the first!</div>}
          {event.going > 5 && <div style={{ textAlign: "center", padding: "8px 0", fontSize: 12, color: "#aaa" }}>+ {event.going - 5} more attending</div>}
        </div>
      </div>

      <div style={{ padding: "16px 20px 32px", display: "flex", gap: 10 }}>
        <button onClick={onToggleSave} style={{ flex: 1, padding: "14px", borderRadius: 14, border: `2px solid ${COLORS.clay}`, background: saved ? COLORS.blush : "#fff", color: COLORS.clay, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
          {saved ? "★ Saved" : "☆ Save"}
        </button>
        <button disabled={full} style={{ flex: 2, padding: "14px", borderRadius: 14, border: "none", background: full ? "#ddd" : COLORS.clay, color: full ? "#999" : "#fff", fontWeight: 800, fontSize: 14, cursor: full ? "not-allowed" : "pointer" }}>
          {full ? "Join Waitlist" : "RSVP — I'm Going!"}
        </button>
      </div>
    </div>
  );
}

/* ─── GROUP DETAIL ────────────────────────────────────────── */
function GroupDetail({ group, joined, onToggleJoin, onBack }) {
  const [tab, setTab] = useState("about");
  const attendees = [
    { name: "Bea G.", mutual: true, school: "IU '23" },
    { name: "Alex M.", mutual: true, school: "IU '22" },
    { name: "Sam R.", mutual: false, school: "Northwestern '23" },
    { name: "Jordan K.", mutual: false, school: "DePaul '24" },
    { name: "Mia T.", mutual: true, school: "IU '23" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", background: COLORS.sand }}>
      <div style={{ background: group.color, padding: "20px 20px 30px" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.25)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <div style={{ fontSize: 52 }}>{group.emoji}</div>
          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "10px 0 4px", fontFamily: "Georgia, serif" }}>{group.name}</h2>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{group.category} • {group.distance} away</div>
        </div>
      </div>
      <div style={{ display: "flex", background: "#fff", padding: "16px 20px", borderBottom: `1px solid ${COLORS.blush}` }}>
        {[["Members", group.members], ["Next Event", "Mar 7"], ["Mutuals", group.mutuals]].map(([l, v], i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? `1px solid ${COLORS.blush}` : "none" }}>
            <div style={{ fontWeight: 800, fontSize: 20, color: COLORS.charcoal }}>{v}</div>
            <div style={{ fontSize: 11, color: "#999" }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", background: "#fff", borderBottom: `1px solid ${COLORS.blush}` }}>
        {["about", "members", "events"].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "12px 0", border: "none", background: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", color: tab === t ? COLORS.clay : "#999", borderBottom: tab === t ? `2px solid ${COLORS.clay}` : "2px solid transparent", textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: 20 }}>
        {tab === "about" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 16 }}>
              <h4 style={{ margin: "0 0 8px", color: COLORS.charcoal, fontSize: 14, fontWeight: 800 }}>About</h4>
              <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.6 }}>A welcoming crew of young professionals. We meet regularly — perfect for post-grads looking to meet new friends in the city.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: 16 }}>
              <h4 style={{ margin: "0 0 10px", color: COLORS.charcoal, fontSize: 14, fontWeight: 800 }}>📅 Next Event</h4>
              <div style={{ background: COLORS.mist, borderRadius: 10, padding: 12 }}>
                <div style={{ fontWeight: 700, color: COLORS.teal, fontSize: 14 }}>{group.nextEvent}</div>
                <div style={{ marginTop: 8, fontSize: 12, color: COLORS.clay, fontWeight: 600 }}>14 people going</div>
              </div>
            </div>
          </div>
        )}
        {tab === "members" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {attendees.map((a, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ background: group.color, borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>{a.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.charcoal }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: "#999" }}>{a.school}</div>
                </div>
                {a.mutual && <span style={{ background: COLORS.blush, color: COLORS.clay, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>Mutual</span>}
              </div>
            ))}
          </div>
        )}
        {tab === "events" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[{ name: "Waterfall Glen Hike", date: "Mar 7 • 9am", going: 14 }, { name: "Lincoln Park Trail Run", date: "Mar 14 • 8am", going: 9 }, { name: "Indiana Dunes Day Trip", date: "Mar 21 • 7:30am", going: 22 }].map((e, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontWeight: 700, color: COLORS.charcoal, fontSize: 14 }}>{e.name}</div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>📅 {e.date} • 👥 {e.going} going</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: "0 20px 32px" }}>
        <button onClick={onToggleJoin} style={{ width: "100%", padding: "16px", borderRadius: 16, border: joined ? `2px solid ${COLORS.clay}` : "none", background: joined ? "#fff" : COLORS.clay, color: joined ? COLORS.clay : "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
          {joined ? "✓ Joined — Leave Group" : "Join This Group"}
        </button>
      </div>
    </div>
  );
}

/* ─── SAVED SCREEN ────────────────────────────────────────── */
function SavedScreen({ groups, events, onSelectGroup, onSelectEvent }) {
  const [tab, setTab] = useState("events");
  return (
    <div style={{ flex: 1, overflowY: "hidden", display: "flex", flexDirection: "column", background: COLORS.sand }}>
      <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: COLORS.charcoal, fontFamily: "Georgia, serif" }}>Saved ⭐</h2>
        <div style={{ display: "flex", gap: 0, marginTop: 12, background: "#fff", borderRadius: 14, padding: 4, boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
          {[{ id: "events", label: "🗓  Events" }, { id: "groups", label: "👥  Groups" }].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 0", border: "none", borderRadius: 10, background: tab === t.id ? COLORS.teal : "transparent", color: tab === t.id ? "#fff" : "#999", fontWeight: 800, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        {tab === "events" && (events.length === 0 ? <Empty label="No saved events" sub="Discover events and tap Save to collect them here." /> : events.map((e) => <EventCard key={e.id} event={e} saved={true} onSelect={onSelectEvent} />))}
        {tab === "groups" && (groups.length === 0 ? <Empty label="No groups joined yet" sub="Head to Discover to find groups near you." /> : groups.map((g) => (
          <div key={g.id} onClick={() => onSelectGroup(g)} style={{ background: "#fff", borderRadius: 16, padding: 16, display: "flex", gap: 14, alignItems: "center", cursor: "pointer", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ background: g.color + "20", borderRadius: 14, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{g.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.charcoal }}>{g.name}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{g.nextEvent}</div>
              <div style={{ fontSize: 11, color: COLORS.teal, fontWeight: 600, marginTop: 4 }}>{g.members} members</div>
            </div>
            <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
          </div>
        )))}
      </div>
    </div>
  );
}

function Empty({ label, sub }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, gap: 12, marginTop: 40 }}>
      <div style={{ fontSize: 52 }}>🐦</div>
      <h3 style={{ fontFamily: "Georgia, serif", color: COLORS.charcoal, margin: 0, fontSize: 20, textAlign: "center" }}>{label}</h3>
      <p style={{ color: "#999", textAlign: "center", margin: 0, fontSize: 13 }}>{sub}</p>
    </div>
  );
}

/* ─── PROFILE ─────────────────────────────────────────────── */
function ProfileScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: COLORS.sand }}>
      <div style={{ background: COLORS.teal, padding: "30px 20px 40px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, background: COLORS.clay, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 12px", border: "3px solid rgba(255,255,255,0.4)" }}>A</div>
        <h2 style={{ color: "#fff", margin: 0, fontFamily: "Georgia, serif", fontSize: 22 }}>Ahna</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", margin: "4px 0 0", fontSize: 13 }}>IU Bloomington '24 • Chicago, IL</p>
      </div>
      <div style={{ padding: "20px 20px", display: "flex", flexDirection: "column", gap: 14, marginTop: -20 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, display: "flex" }}>
          {[["1", "Groups"], ["1", "Events"], ["5", "Mutuals"]].map(([v, l], i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? `1px solid ${COLORS.blush}` : "none" }}>
              <div style={{ fontWeight: 800, fontSize: 22, color: COLORS.charcoal }}>{v}</div>
              <div style={{ fontSize: 11, color: "#999" }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 16 }}>
          <h4 style={{ margin: "0 0 12px", color: COLORS.charcoal, fontWeight: 800 }}>My Interests</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Hiking", "Alumni Events", "Reading", "Travel"].map((i) => (
              <span key={i} style={{ background: COLORS.blush, color: COLORS.clay, fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 20 }}>{i}</span>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden" }}>
          {["Edit Profile", "Notification Settings", "Privacy", "Help & Feedback", "Sign Out"].map((item, i) => (
            <div key={i} style={{ padding: "14px 16px", borderBottom: i < 4 ? `1px solid ${COLORS.blush}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 14, color: COLORS.charcoal, fontWeight: 500 }}>{item}</span>
              <span style={{ color: "#ccc" }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ONBOARDING ──────────────────────────────────────────── */
function OnboardingScreen({ step, setStep, interests, selectedInterests, toggleInterest, finish }) {
  const steps = [
    { title: "Welcome to Roost", body: "Find your people through local groups and events — no awkward small talk required.", cta: "Get Started" },
    { title: "What are you into?", body: null, cta: "Continue" },
    { title: "Where are you?", body: "We'll show you groups and events in your city.", cta: "Let's go 🎉" },
  ];
  const s = steps[step];
  return (
    <div style={styles.phone}>
      <div style={styles.statusBar}><span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span><span style={{ fontSize: 12 }}>●●● WiFi 🔋</span></div>
      <div style={{ ...styles.screen, background: step === 0 ? COLORS.teal : COLORS.sand, display: "flex", flexDirection: "column", justifyContent: "center", padding: 28, gap: 20 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: i === step ? 20 : 8, height: 8, borderRadius: 4, background: step === 0 ? (i === step ? "#fff" : "rgba(255,255,255,0.3)") : (i === step ? COLORS.clay : "#ccc"), transition: "all 0.3s" }} />)}
        </div>
        {step === 0 && <><div style={{ textAlign: "center", fontSize: 64 }}>🐦</div><h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: 0, fontFamily: "Georgia, serif", textAlign: "center", lineHeight: 1.2 }}>{s.title}</h1><p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, textAlign: "center", margin: 0 }}>{s.body}</p></>}
        {step === 1 && <><h2 style={{ color: COLORS.charcoal, fontSize: 26, fontWeight: 800, margin: 0, fontFamily: "Georgia, serif" }}>{s.title}</h2><div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{interests.map((i) => <button key={i} onClick={() => toggleInterest(i)} style={{ padding: "8px 16px", borderRadius: 20, border: `2px solid ${selectedInterests.includes(i) ? COLORS.clay : "#ddd"}`, background: selectedInterests.includes(i) ? COLORS.clay : "#fff", color: selectedInterests.includes(i) ? "#fff" : COLORS.charcoal, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{i}</button>)}</div></>}
        {step === 2 && <><div style={{ textAlign: "center", fontSize: 56 }}>📍</div><h2 style={{ color: COLORS.charcoal, fontSize: 26, fontWeight: 800, margin: 0, fontFamily: "Georgia, serif", textAlign: "center" }}>{s.title}</h2><div style={{ background: "#fff", borderRadius: 16, padding: 20, border: `2px solid ${COLORS.blush}`, textAlign: "center" }}><div style={{ fontSize: 28 }}>🏙️</div><div style={{ fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 8 }}>Chicago, IL</div><div style={{ color: "#888", fontSize: 13 }}>Auto-detected</div></div><p style={{ color: "#888", fontSize: 14, textAlign: "center", margin: 0 }}>{s.body}</p></>}
        <button onClick={() => step < 2 ? setStep(step + 1) : finish()} style={{ marginTop: 8, padding: "16px", borderRadius: 14, border: "none", background: step === 0 ? "#fff" : COLORS.clay, color: step === 0 ? COLORS.teal : "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>{s.cta}</button>
      </div>
    </div>
  );
}

const styles = {
  phone: { width: 390, height: 844, background: "#fff", borderRadius: 44, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 30px 80px rgba(0,0,0,0.25), 0 0 0 8px #1a1a1a", margin: "0 auto", fontFamily: "'Helvetica Neue', sans-serif" },
  statusBar: { height: 44, background: COLORS.sand, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", flexShrink: 0 },
  screen: { flex: 1, overflowY: "hidden", display: "flex", flexDirection: "column" },
  navBar: { height: 72, background: "#fff", borderTop: `1px solid ${COLORS.blush}`, display: "flex", flexShrink: 0 },
  navBtn: { flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 2, paddingTop: 4 },
};

export default function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", background: "#e8e0d8", paddingTop: "30px", paddingBottom: "30px" }}>
      <div style={{ transform: "scale(0.88)", transformOrigin: "top center" }}>
        <RoostApp />
      </div>
    </div>
  );
}