import type { CourseContentMap } from "./types";

/**
 * Module 4 of Bridge Engineering, kept in its own file because the course's
 * lesson content is long enough to be worth two: `bridge-engineering-content.ts`
 * carries the first three modules, and this one carries the materials.
 *
 * Everything here is authored to the same rules as the rest of the course, and
 * the content suite in `bridge-content.test.ts` holds it to them:
 *
 *  - every heading, paragraph and list carries a `figure` (a scene or a diagram),
 *    because no step of this course is words alone;
 *  - every lesson asks at least two questions and shows at least one drawing;
 *  - a `parts` / `hotspot` / `assemble` block may only name part ids that its
 *    scene actually draws (see SCENE_PARTS in `components/bridge/scenes.tsx`);
 *  - each step has an id of its own: kebab-case, unique inside its lesson;
 *  - the harder questions carry an `explanation`, and a hotspot's explanation
 *    ends on a drawing with the answer itself highlighted;
 *  - a `sort` block only files cards into boxes whose vocabulary has already
 *    been taught in prose earlier in the same level.
 */
export const bridgeMaterialsContent: CourseContentMap = {
  "materials-and-durability": {
    // ── What Bridges Are Made Of ───────────────────────────────────────────
    "bridge-materials": [
      {
        id: "what-bridges-are-made-of",
        type: "heading",
        text: "What Bridges Are Made Of",
        figure: {
          visual: {
            kind: "scene",
            scene: "materials",
          },
          caption: "Four materials have carried bridges, and each one belongs to its own age.",
        },
      },
      {
        id: "four-materials-of-history",
        type: "paragraph",
        text: "Ask what a bridge is made of and the answer changes with the century. Timber came first, because it was easy to find and easy to work. Stone and the other masonry materials — brick, and plain concrete — followed, and a stone arch bridge can stand for a thousand years. Then industry arrived and brought steel, and with steel came reinforced and prestressed concrete. Steel and concrete are the two materials almost every modern bridge is built from.",
        figure: {
          visual: {
            kind: "scene",
            scene: "materials",
            highlight: ["steel", "concrete"],
          },
          caption: "Steel and concrete between them carry the great majority of modern spans.",
        },
      },
      {
        id: "history-in-five-lines",
        type: "list",
        items: [
          "Timber — the oldest bridge material. The largest timber beam bridge in Chinese history was the Wei Bridge, built in the Qin dynasty where the capital Xianyang crossed the Wei river; the Han called it the Middle Wei Bridge, and it was the first bridge on the Silk Road out of Han Chang'an.",
          "Rope and cane — bamboo or rattan cables slung as a main cable. Suspension bridges of this kind are among the earliest bridge forms anywhere.",
          "Stone — the Luoyang Bridge at Quanzhou in Fujian, first called the Wan'an Bridge and known as the first bridge under heaven, is the country's earliest stone bridge: a long sea-crossing beam bridge of great stone slabs.",
          "Masonry arches — piled piers and cut-stone rings carried roads across rivers all over the world. Zhaozhou Bridge in Hebei is the masterpiece of the form, and a great many lesser arches are still carrying traffic today.",
          "Steel and concrete — the materials of the industrial age, and the two that reach the spans modern traffic asks for.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "arch",
            highlight: ["arch-ring"],
          },
          caption: "A masonry arch works in compression alone, which is why it lasts so well.",
        },
      },
      {
        id: "four-materials-on-one-drawing",
        type: "figure",
        scene: "materials",
        caption: "Timber, stone, steel and concrete — the four materials, oldest at the top.",
      },
      {
        id: "take-the-tour-of-materials",
        type: "parts",
        prompt: "Take the tour: tap each material on the drawing.",
        scene: "materials",
        hint: "Four pins, four materials, in the order history used them.",
      },
      {
        id: "oldest-bridge-material",
        type: "hotspot",
        prompt: "Tap the material most ancient bridges were built from.",
        scene: "materials",
        parts: ["timber", "stone", "steel", "concrete"],
        answer: "timber",
        explanation: {
          steps: [
            {
              text: "Start with what a builder could find on the spot, without a quarry or a furnace.",
              visual: {
                kind: "scene",
                scene: "materials",
                highlight: ["timber", "stone"],
                labels: true,
              },
            },
            {
              text: "Stone is stronger and lasts longer, but a wooden bridge could be cut, carried and thrown across a river in a single season.",
              visual: {
                kind: "scene",
                scene: "materials",
                highlight: ["timber"],
                labels: true,
                caption: "Timber: easy to find, easy to work, and the oldest material of all.",
              },
            },
          ],
        },
      },
      {
        id: "two-modern-materials",
        type: "choose",
        prompt: "Which two materials carry almost every modern bridge?",
        choices: [
          "Timber and stone",
          "Steel and concrete",
          "Brick and plain concrete",
          "Timber and steel",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Timber and masonry are still used, but mostly on small spans and as decoration.",
              visual: {
                kind: "scene",
                scene: "materials",
                highlight: ["timber", "stone"],
                labels: true,
              },
            },
            {
              text: "Steel carries tension and compression alike, and concrete is cheap, mouldable and durable — between them they cover every span a bridge has to reach.",
              visual: {
                kind: "scene",
                scene: "materials",
                highlight: ["steel", "concrete"],
                labels: true,
                caption: "Steel and concrete: the two materials of the modern bridge.",
              },
            },
          ],
        },
      },
      {
        id: "order-the-materials",
        type: "order",
        prompt: "Put the materials in the order bridge building used them.",
        items: [
          {
            id: "timber-stage",
            label: "Timber beams and rope cables — built from what grew nearby",
          },
          {
            id: "stone-stage",
            label: "Stone and masonry arches — cut-stone rings, many still standing",
          },
          {
            id: "steel-stage",
            label: "Steel arrives with industry, and spans grow far beyond masonry",
          },
          {
            id: "concrete-stage",
            label: "Reinforced and prestressed concrete, the material of most modern bridges",
          },
        ],
        explanation: {
          steps: [
            {
              text: "Each new material was adopted only when it could do something the last one could not.",
              visual: {
                kind: "scene",
                scene: "materials",
                highlight: ["timber", "stone"],
                labels: true,
              },
            },
            {
              text: "Steel was the first material that could be relied on in tension, which is what let spans grow past masonry.",
              visual: {
                kind: "scene",
                scene: "materials",
                highlight: ["steel"],
                labels: true,
              },
            },
            {
              text: "Concrete came last, and then learned to be reinforced and prestressed — which is why so much of what is built now is concrete.",
              visual: {
                kind: "scene",
                scene: "materials",
                highlight: ["concrete"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "why-a-masonry-arch-lasts",
        type: "choose",
        prompt: "A stone arch bridge a thousand years old still carries traffic. What does a masonry arch rely on?",
        choices: [
          "Steel bars hidden inside the stone",
          "Compression — the stones push against one another and the ground pushes back",
          "The tensile strength of the mortar",
          "Cables slung under the deck",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Masonry is strong in compression and almost useless in tension, so an arch is the only shape that suits it.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring"],
                labels: true,
              },
            },
            {
              text: "The load pushes down, the ring pushes back along its curve, and the feet push outwards into the ground — all of it compression.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring", "thrust"],
                labels: true,
                caption: "Compression in the ring, thrust at the feet: an arch needs nothing else.",
              },
            },
          ],
        },
      },
    ],

    // ── Steel in a Bridge ──────────────────────────────────────────────────
    "steel-in-the-bridge": [
      {
        id: "steel-in-a-bridge",
        type: "heading",
        text: "Steel in a Bridge",
        figure: {
          visual: {
            kind: "scene",
            scene: "bridge-steel",
          },
          caption: "One bridge order, three quite different kinds of steel.",
        },
      },
      {
        id: "three-kinds-of-bridge-steel",
        type: "paragraph",
        text: "A bridge is not built from steel; it is built from several steels. Sorted by what they do, they fall into three kinds: the structural steel of a steel structure, the reinforcing steel cast inside reinforced and prestressed concrete, and the cable steel of a cable-stayed bridge's stays or a suspension bridge's main cables. Each is bought to a different standard, and each is strong in a different way.",
        figure: {
          visual: {
            kind: "scene",
            scene: "bridge-steel",
            highlight: ["structural-steel", "reinforcing-steel", "cable-steel"],
          },
          caption: "Structural steel, reinforcing steel and cable steel: three jobs, three kinds of steel.",
        },
      },
      {
        id: "three-kinds-as-concepts",
        type: "concepts",
        prompt: "The three kinds of bridge steel, one at a time.",
        concepts: [
          {
            id: "structural",
            label: "Structural steel",
            summary:
              "Plate and rolled sections, welded, riveted or bolted into a complete structure — girders, trusses, towers and the connections that hold them together.",
            scene: "bridge-steel",
            highlight: ["structural-steel"],
          },
          {
            id: "reinforcing",
            label: "Reinforcing steel",
            summary:
              "Round bars, plain or ribbed, cast inside concrete to take the tension the concrete cannot — the ordinary and prestressing bars of a concrete bridge.",
            scene: "bridge-steel",
            highlight: ["reinforcing-steel"],
          },
          {
            id: "cable",
            label: "Cable steel",
            summary:
              "Very high strength wire and strand, drawn out into the stays of a cable-stayed bridge or the main cables of a suspension bridge.",
            scene: "bridge-steel",
            highlight: ["cable-steel"],
          },
        ],
      },
      {
        id: "take-the-tour-of-bridge-steel",
        type: "parts",
        prompt: "Take the tour: tap each kind of steel.",
        scene: "bridge-steel",
        hint: "Three pins. Ask yourself where each one would sit on a real bridge.",
      },
      {
        id: "what-structural-steel-is-bought-as",
        type: "paragraph",
        text: "Structural steel arrives as plate and as rolled sections. It is cut, drilled and joined by welding, riveting or bolting into a complete structure that carries the load; the connections themselves are a second order of steel, the bolts and weld metal that hold the members together. A bridge steel has to survive heavy dead load, live load and impact, so both its chemical composition and its mechanical properties are strictly specified.",
        figure: {
          visual: {
            kind: "scene",
            scene: "superstructure",
            highlight: ["main-girder", "cross-beam"],
          },
          caption: "Girders, cross beams and connections are all structural steel.",
        },
      },
      {
        id: "how-bridge-steel-is-classified",
        type: "list",
        items: [
          "By chemical composition — carbon structural steel, or low-alloy high-strength structural steel, which adds a little alloy to buy strength and toughness.",
          "By what the bridge carries — highway bridge steel and railway bridge steel, chosen for the working environment and the loads of each.",
          "By what the site demands — a sea crossing sits in a marine corrosive environment, on substructures that are hard to reach, under harsh service conditions, so its steel is asked for more in mechanical properties, in fabrication properties and in weather resistance.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "cable-stayed",
            highlight: ["stay-cable", "tower"],
          },
          caption: "A long span in a hard environment is where the toughest steel is bought.",
        },
      },
      {
        id: "steel-that-becomes-a-stay",
        type: "hotspot",
        prompt: "Tap the kind of steel that becomes the stays of a cable-stayed bridge.",
        scene: "bridge-steel",
        parts: ["structural-steel", "reinforcing-steel", "cable-steel"],
        answer: "cable-steel",
        explanation: {
          steps: [
            {
              text: "A stay is a member in pure tension, and it is asked to be as light as it can be for the force it carries.",
              visual: {
                kind: "scene",
                scene: "bridge-steel",
                highlight: ["structural-steel"],
                labels: true,
              },
            },
            {
              text: "The same steel becomes the main cable of a suspension bridge — the strongest member in any structure.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["main-cable", "hanger"],
                labels: true,
              },
            },
            {
              text: "Plate and bar are far too heavy for either job; what is wanted is wire, drawn out to a very high strength and twisted into strand.",
              visual: {
                kind: "scene",
                scene: "bridge-steel",
                highlight: ["cable-steel"],
                labels: true,
                caption: "Cable steel: high-strength wire and strand, made to be pulled.",
              },
            },
          ],
        },
      },
      {
        id: "file-each-piece-of-steel",
        type: "sort",
        prompt: "File each piece of steel under the kind it is.",
        buckets: [
          { id: "structural", label: "Structural steel" },
          { id: "reinforcing", label: "Reinforcing steel" },
          { id: "cable", label: "Cable steel" },
        ],
        items: [
          {
            id: "box-girder-plate",
            label: "A 40 mm plate welded into a box girder",
            bucket: "structural",
          },
          {
            id: "truss-section",
            label: "A rolled section forming a truss chord",
            bucket: "structural",
          },
          {
            id: "pier-cage",
            label: "A ribbed bar bent into the cage of a pier",
            bucket: "reinforcing",
          },
          {
            id: "slab-mesh",
            label: "Plain round bar laid as mesh in a deck slab",
            bucket: "reinforcing",
          },
          {
            id: "stay-strand",
            label: "Seven wires twisted into one stay, stressed to 1860 MPa",
            bucket: "cable",
          },
          {
            id: "main-cable-wire",
            label: "Wire spun back and forth into a suspension main cable",
            bucket: "cable",
          },
        ],
        explanation: {
          steps: [
            {
              text: "Ask what the piece does: carry a whole structure, sit inside concrete, or be pulled in tension on its own.",
              visual: {
                kind: "scene",
                scene: "bridge-steel",
                highlight: ["structural-steel", "reinforcing-steel", "cable-steel"],
                labels: true,
              },
            },
            {
              text: "Plate and rolled sections build the structure; bars work inside concrete; wire and strand are for cables.",
              visual: {
                kind: "scene",
                scene: "bridge-steel",
                highlight: ["reinforcing-steel"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "highway-or-railway-steel",
        type: "choose",
        prompt: "Two large bridges are ordered on the same day: one carries a motorway, one carries a railway. What separates the steel they are bought to?",
        choices: [
          "The railway bridge steel is always stainless",
          "Highway bridge steel and railway bridge steel — the working environment and the loads each one has to carry",
          "Railway bridges use only reinforcing steel",
          "There is no difference at all",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "A railway bridge takes a much harder dynamic load, and often a fatigue load that never stops.",
              visual: {
                kind: "scene",
                scene: "carries",
                highlight: ["railway"],
                labels: true,
              },
            },
            {
              text: "Steel for large bridges is therefore classified for highway or railway work, matched to the environment and the loads of the site.",
              visual: {
                kind: "scene",
                scene: "carries",
                highlight: ["roadway", "railway"],
                labels: true,
                caption: "Road and rail ask different things of the same steel.",
              },
            },
          ],
        },
      },
    ],

    // ── Reading a Steel Grade ──────────────────────────────────────────────
    "reading-a-steel-grade": [
      {
        id: "reading-a-steel-grade",
        type: "heading",
        text: "Reading a Steel Grade",
        figure: {
          visual: {
            kind: "scene",
            scene: "steel-grade",
          },
          caption: "Four symbols, and every one of them is a promise about the steel.",
        },
      },
      {
        id: "q355qd-letter-by-letter",
        type: "paragraph",
        text: "A steel grade is a short name with a great deal inside it. Take Q355qD, which the bridge steel standard writes in exactly this form. The capital Q is the first letter of the Chinese word for yield: the grade is named after the stress at which the steel gives way. The 355 is the minimum yield strength, in megapascals — the number a designer actually calculates with. The small q marks bridge steel, made to the bridge standard rather than the general structural one. The capital D is the quality grade, and what it really promises is toughness at low temperature.",
        figure: {
          visual: {
            kind: "scene",
            scene: "steel-grade",
            highlight: ["yield-letter", "yield-strength", "bridge-letter", "quality-grade"],
          },
          caption: "Q355qD read across: yield point, 355 MPa, bridge steel, quality grade D.",
        },
      },
      {
        id: "four-symbols-on-the-drawing",
        type: "figure",
        scene: "steel-grade",
        labels: true,
        caption: "Read a grade left to right, and each symbol adds one fact to the last.",
      },
      {
        id: "take-the-tour-of-the-grade",
        type: "parts",
        prompt: "Take the tour: tap each part of the grade.",
        scene: "steel-grade",
        hint: "Five pins. The last one is about how the steel is made, not what it is called.",
      },
      {
        id: "read-the-grade-in-order",
        type: "order",
        prompt: "Read Q355qD the way its standard does — one symbol at a time.",
        items: [
          { id: "letter-q", label: "Q — the yield point: the grade is named after the stress that yields" },
          { id: "number-355", label: "355 — the minimum yield strength, in megapascals" },
          { id: "letter-small-q", label: "q — bridge steel, to the bridge standard" },
          { id: "letter-d", label: "D — the quality grade, which is a promise about toughness" },
        ],
        explanation: {
          steps: [
            {
              text: "The first symbol always says what the number after it measures.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["yield-letter", "yield-strength"],
                labels: true,
              },
            },
            {
              text: "Then the letters narrow it down: q says which standard it was made to, and D says how tough it stays when it is cold.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["bridge-letter", "quality-grade"],
                labels: true,
                caption: "Bridge steel, quality grade D: the two letters that decide where it may be used.",
              },
            },
          ],
        },
      },
      {
        id: "the-grades-that-exist",
        type: "paragraph",
        text: "Bridge steel is not one grade but a family. The low-alloy high-strength structural steels used for bridges run from Q355q and Q370q up through the Q420q, Q460q, Q500q, Q550q and Q620q grades to Q690q — eight grades in all, each with its own minimum yield strength. A designer picks the grade the member needs, and pays for strength only where strength is used.",
        figure: {
          visual: {
            kind: "scene",
            scene: "steel-grade",
            highlight: ["yield-strength"],
          },
          caption: "From Q355q to Q690q: the family a bridge designer chooses within.",
        },
      },
      {
        id: "quality-levels-and-killed-steel",
        type: "list",
        items: [
          "Quality levels run from A to E, and A is the least demanding of them. Bridge steel uses only four: C, D, E and F.",
          "The letter is not about strength at all — it is about toughness, and especially about how tough the steel still is at the lowest temperature the site will see.",
          "Deoxidation symbols say how the steel was made: F for rimmed steel, b for semi-killed, Z for killed and TZ for special killed. Z and TZ may be left out of a grade.",
          "Bridge steel is always killed or special killed, so a bridge grade never carries a deoxidation symbol — its absence is itself information.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "steel-grade",
            highlight: ["killed-steel"],
          },
          caption: "Killing the steel leaves it uniform, tough and safe to weld.",
        },
      },
      {
        id: "promise-of-the-quality-grade",
        type: "hotspot",
        prompt: "Tap the part of the grade that promises toughness at low temperature.",
        scene: "steel-grade",
        parts: ["yield-letter", "yield-strength", "bridge-letter", "quality-grade"],
        answer: "quality-grade",
        explanation: {
          steps: [
            {
              text: "The Q and the number are about strength — how much the steel can take before it gives way.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["yield-letter", "yield-strength"],
                labels: true,
              },
            },
            {
              text: "The small q only says which standard the steel was bought to; it says nothing about how it behaves in the cold.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["bridge-letter"],
                labels: true,
              },
            },
            {
              text: "The quality grade is the one that matters here: D means the steel is impact-tested at a lower temperature than C, and E and F lower still.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["quality-grade"],
                labels: true,
                caption: "The quality grade: a promise about toughness, not about strength.",
              },
            },
          ],
        },
      },
      {
        id: "which-levels-bridge-steel-uses",
        type: "choose",
        prompt: "Quality levels are written A to E. Which of them does bridge steel use?",
        choices: ["A and B only", "All five, A to E", "C, D, E and F", "D and E only"],
        answer: 2,
        explanation: {
          steps: [
            {
              text: "The five general quality levels run A to E, and A is the weakest requirement of them.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["quality-grade"],
                labels: true,
              },
            },
            {
              text: "Bridge steel is held to the higher levels — C, D, E and the special F — because a bridge is welded, loaded many millions of times, and out in all weathers.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["quality-grade", "killed-steel"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "no-deoxidation-symbol",
        type: "choose",
        prompt: "A bridge steel grade carries no deoxidation symbol. Why not?",
        choices: [
          "Because the symbol is only used on reinforcing bars",
          "Because bridge steel is always killed or special killed, so there is nothing to say",
          "Because the symbol was abolished",
          "Because the steel is not deoxidised at all",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "The symbols F, b, Z and TZ say how much oxygen was driven out of the steel before it was cast.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["killed-steel"],
                labels: true,
              },
            },
            {
              text: "Fully killed steel is uniform, tough and reliable to weld, so bridge steel is always killed or special killed — and a symbol that is always the same is left out.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["killed-steel"],
                labels: true,
                caption: "Killed or special killed: the only two states a bridge steel is ever delivered in.",
              },
            },
          ],
        },
      },
    ],

    // ── High-Performance Steel ─────────────────────────────────────────────
    "high-performance-steel": [
      {
        id: "high-performance-steel",
        type: "heading",
        text: "High-Performance Steel",
        figure: {
          visual: {
            kind: "scene",
            scene: "high-performance-steel",
          },
          caption: "Four demands at once: strength, toughness, weldability and corrosion resistance.",
        },
      },
      {
        id: "the-three-generations",
        type: "paragraph",
        text: "Bridge steel has moved along one line for a century: from carbon-manganese steel, to high-strength steel, to high-performance steel. The middle step solved one problem and left others. Traditional high-strength bridge steel could be strong, but its impact toughness, its weldability and its fatigue performance were poor, and it could not resist atmospheric or sea-water corrosion. High-performance steel is defined by a simpler idea: one or more of its properties is markedly better than the traditional steel's, without giving anything away elsewhere.",
        figure: {
          visual: {
            kind: "scene",
            scene: "high-performance-steel",
            highlight: ["high-strength", "low-temperature", "weldability", "corrosion"],
          },
          caption: "Carbon-manganese to high-strength to high-performance: each step adds a demand.",
        },
      },
      {
        id: "take-the-tour-of-the-demands",
        type: "parts",
        prompt: "Take the tour: tap each demand modern bridge steel has to meet.",
        scene: "high-performance-steel",
        hint: "Four pins, and a long-span bridge needs all four at once.",
      },
      {
        id: "why-toughness-matters",
        type: "paragraph",
        text: "Toughness is the property that decides whether a small crack stays small. It governs two things at once on a steel bridge: resistance to fatigue, the slow cracking that millions of load cycles cause, and resistance to brittle fracture, where a crack runs across a plate without warning. Steel that is tough at room temperature can still be brittle on a January night, which is why the quality grade is tied to a test temperature.",
        figure: {
          visual: {
            kind: "scene",
            scene: "high-performance-steel",
            highlight: ["low-temperature"],
          },
          caption: "Toughness at the coldest temperature the site will see stops cracks running.",
        },
      },
      {
        id: "why-weldability-matters",
        type: "paragraph",
        text: "The second demand comes from how bridges are now built. Riveting has almost gone; steel bridges are welded, and the welded proportion of a steel bridge keeps growing. Every weld is a place where the steel has been melted and cooled again, so the steel itself must weld without cracking and without turning hard and brittle beside the weld. Good weldability is what makes the fabrication quality of a long span achievable at all.",
        figure: {
          visual: {
            kind: "scene",
            scene: "bridge-steel",
            highlight: ["structural-steel"],
          },
          caption: "More welding means the steel has to tolerate being welded.",
        },
      },
      {
        id: "weathering-steel",
        type: "paragraph",
        text: "The fourth demand is the one a bridge pays for over its whole life. Weathering steel is an ordinary steel with a small, deliberate addition of alloying elements; the result resists corrosion under natural atmospheric conditions well enough that it can be used with no coating at all. A bridge left unpainted costs less to keep, and the standard sets out strict requirements on its design, its grade, its properties and its economics. The trend is clear: weathering steel is on its way to being treated as an ordinary bridge steel.",
        figure: {
          visual: {
            kind: "scene",
            scene: "high-performance-steel",
            highlight: ["corrosion"],
          },
          caption: "Weathering steel forms a tight protective rust instead of needing paint.",
        },
      },
      {
        id: "steel-left-unpainted",
        type: "hotspot",
        prompt: "Tap the property that lets a steel bridge stand with no paint on it.",
        scene: "high-performance-steel",
        parts: ["high-strength", "low-temperature", "weldability", "corrosion"],
        answer: "corrosion",
        explanation: {
          steps: [
            {
              text: "Strength and toughness decide how the steel behaves under load, and weldability decides how it can be built with.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["high-strength", "low-temperature", "weldability"],
                labels: true,
              },
            },
            {
              text: "None of those keeps the weather out. Painting is how ordinary steel is protected, and painting has to be redone for as long as the bridge stands.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["corrosion"],
                labels: true,
                caption: "Corrosion resistance is what makes an unpainted bridge possible.",
              },
            },
            {
              text: "Weathering steel does the job with alloying elements instead: it rusts once, tightly, and then stops, which is why it carries the lowest whole-life cost of any structural steel.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["corrosion"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "order-the-generations",
        type: "order",
        prompt: "Put the development of bridge steel in order.",
        items: [
          { id: "carbon-manganese", label: "Carbon-manganese steel — the steel bridges were first built from" },
          {
            id: "high-strength",
            label: "High-strength steel — stronger, but poor in toughness, weldability and fatigue",
          },
          {
            id: "high-performance",
            label: "High-performance steel — strength kept, with toughness, weldability and corrosion resistance added",
          },
        ],
        explanation: {
          steps: [
            {
              text: "Each generation was reached by asking the steel to do one more thing, not by giving up the last one.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["high-strength"],
                labels: true,
              },
            },
            {
              text: "A high yield strength lets a lighter girder carry the same load, which matters most on a very long span.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["high-strength", "low-temperature"],
                labels: true,
              },
            },
            {
              text: "High-performance steel adds the properties the old high-strength steel was missing — and weathering steel is where that trend is heading next.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["low-temperature", "weldability", "corrosion"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "why-toughness-and-weldability",
        type: "choose",
        prompt: "Why are toughness and weldability singled out for modern bridge steel?",
        choices: [
          "Toughness keeps the bridge light and weldability keeps it cheap",
          "Toughness governs fatigue and brittle fracture, and welded construction keeps growing",
          "Both are needed only for railway bridges",
          "Neither matters once the steel is galvanised",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "A steel bridge is loaded millions of times and lives out of doors, so a crack that starts must be stopped from running.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["low-temperature"],
                labels: true,
              },
            },
            {
              text: "And it is welded rather than riveted, so the steel must be able to be welded without cracking or hardening.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["weldability"],
                labels: true,
                caption: "Toughness for the winter, weldability for the works.",
              },
            },
          ],
        },
      },
    ],

    // ── Reinforcing Steel ──────────────────────────────────────────────────
    "reinforcing-steel": [
      {
        id: "reinforcing-steel",
        type: "heading",
        text: "Reinforcing Steel",
        figure: {
          visual: {
            kind: "scene",
            scene: "reinforcement",
          },
          caption: "Two families of bar: ordinary reinforcement, and the steel that pulls concrete tight.",
        },
      },
      {
        id: "two-families-of-reinforcement",
        type: "paragraph",
        text: "The steel inside a concrete bridge comes in two families. Ordinary bars reinforce reinforced concrete: they take the tension that concrete cannot, and they hold cracks closed. Prestressing steel does something more active — it is stretched and anchored so that it squeezes the concrete together before the bridge carries anything at all.",
        figure: {
          visual: {
            kind: "scene",
            scene: "reinforcement",
            highlight: ["ordinary-bar", "strand", "high-strength-bar"],
          },
          caption: "Ordinary bar, strand and high-strength bar: the three shapes of reinforcement.",
        },
      },
      {
        id: "take-the-tour-of-reinforcement",
        type: "parts",
        prompt: "Take the tour: tap each kind of steel bar.",
        scene: "reinforcement",
        hint: "Three pins. Two of them are prestressing steel, and only one is ordinary reinforcement.",
      },
      {
        id: "ordinary-bars",
        type: "paragraph",
        text: "An ordinary bar is round in section and mostly hot-rolled. Its surface comes in three forms: plain, spiral rib, and chevron rib — the ribs are what grip the concrete. Ordinary bars are bought by their tensile strength standard value: 300, 400 and 500 MPa. Their elastic modulus is 2.1 × 10⁵ MPa for HPB300 and 2.0 × 10⁵ MPa for every other grade, so the stiffer bar is the plain one.",
        figure: {
          visual: {
            kind: "scene",
            scene: "reinforcement",
            highlight: ["ordinary-bar"],
          },
          caption: "Ribs are not decoration: they are how a bar holds on to the concrete.",
        },
      },
      {
        id: "prestressing-steel",
        type: "paragraph",
        text: "Prestressing steel has gone in one direction for decades: higher strength, lower relaxation, larger diameter. Three kinds are in use — high-strength wire, strand, and high-strength bar. Strand is made by twisting several high-strength wires round a slightly thicker core wire and then stress-relieving it, which gives high strength, good relaxation behaviour and a tendon that stays straight as it is unrolled. The common tensile strength class of strand is 1860 MPa, with 1720, 1770 and 1960 MPa classes also available. When a tendon is stressed, the jacking control stress is normally kept to no more than 0.75 of its standard strength.",
        figure: {
          visual: {
            kind: "scene",
            scene: "reinforcement",
            highlight: ["strand"],
          },
          caption: "Seven wires twisted into one strand: the tendon of a prestressed bridge.",
        },
      },
      {
        id: "high-strength-bars-and-the-price",
        type: "list",
        items: [
          "High-strength bar systems in bridges are usually rolled-thread bars with a standard strength of 785 MPa or more, in five diameters: 18, 25, 32, 40 and 50 mm.",
          "A bar arrives with its own thread and nut, so a tendon can be anchored and tightened on site rather than in a factory.",
          "Strength is not free. In some cases the increase in strength has been bought by lowering the ductility and toughness of the material.",
          "Higher-strength prestressing steel can also raise the risk of hydrogen stress corrosion, and these disadvantages have to be weighed when the steel is chosen.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "reinforcement",
            highlight: ["high-strength-bar"],
          },
          caption: "A rolled-thread bar: high strength and low relaxation, with a nut to anchor it.",
        },
      },
      {
        id: "tendon-that-pulls-concrete-together",
        type: "hotspot",
        prompt: "Tap the steel that pulls a prestressed bridge together.",
        scene: "reinforcement",
        parts: ["ordinary-bar", "strand", "high-strength-bar"],
        answer: "strand",
        explanation: {
          steps: [
            {
              text: "Ordinary reinforcement is passive: it waits until the concrete cracks and then takes the tension.",
              visual: {
                kind: "scene",
                scene: "reinforcement",
                highlight: ["ordinary-bar"],
                labels: true,
              },
            },
            {
              text: "A prestressing tendon works before the load arrives — it is stretched and anchored so that it squeezes the concrete together.",
              visual: {
                kind: "scene",
                scene: "reinforcement",
                highlight: ["strand", "high-strength-bar"],
                labels: true,
              },
            },
            {
              text: "Strand is the one that pulls: several wires twisted round a core, stressed to about 0.75 of its standard strength and then locked off.",
              visual: {
                kind: "scene",
                scene: "reinforcement",
                highlight: ["strand"],
                labels: true,
                caption: "Strand: the tendon that puts the concrete into compression.",
              },
            },
          ],
        },
      },
      {
        id: "file-each-bar",
        type: "sort",
        prompt: "File each bar under the kind of steel it is.",
        buckets: [
          { id: "ordinary", label: "Ordinary bar" },
          { id: "strand", label: "Strand" },
          { id: "high-strength", label: "High-strength bar" },
        ],
        items: [
          {
            id: "plain-round",
            label: "A plain round hot-rolled bar laid in a slab",
            bucket: "ordinary",
          },
          {
            id: "ribbed-cage",
            label: "A 25 mm ribbed bar bent into a pier cage",
            bucket: "ordinary",
          },
          {
            id: "seven-wire-tendon",
            label: "Seven wires twisted round a core, stressed to 1860 MPa",
            bucket: "strand",
          },
          {
            id: "jacked-tendon",
            label: "A tendon jacked to 0.75 of its standard strength in a box girder",
            bucket: "strand",
          },
          {
            id: "threaded-bar",
            label: "A 32 mm rolled-thread bar anchored with a nut on site",
            bucket: "high-strength",
          },
        ],
        explanation: {
          steps: [
            {
              text: "Ask whether the bar waits for the concrete to crack, or squeezes it before anything is carried.",
              visual: {
                kind: "scene",
                scene: "reinforcement",
                highlight: ["ordinary-bar"],
                labels: true,
              },
            },
            {
              text: "Ordinary bars are passive and bought by tensile class; prestressing steel is active, and comes either as strand or as a large threaded bar.",
              visual: {
                kind: "scene",
                scene: "reinforcement",
                highlight: ["strand", "high-strength-bar"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "jacking-stress-limit",
        type: "choose",
        prompt: "Strand of the 1860 MPa class is being stressed. What does the jacking control stress normally stay below?",
        choices: [
          "0.5 of the standard strength",
          "0.75 of the standard strength",
          "The standard strength itself",
          "1.2 times the standard strength",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "A tendon is stressed to a high proportion of its strength — that is the whole point of prestressing.",
              visual: {
                kind: "scene",
                scene: "reinforcement",
                highlight: ["strand"],
                labels: true,
              },
            },
            {
              text: "But it is left with a margin, so the jacking control stress is normally no more than 0.75 of the standard strength.",
              visual: {
                kind: "scene",
                scene: "reinforcement",
                highlight: ["strand"],
                labels: true,
                caption: "Three quarters of the standard strength: high enough to work, low enough to be safe.",
              },
            },
          ],
        },
      },
      {
        id: "the-price-of-strength",
        type: "choose",
        prompt: "Prestressing steel keeps getting stronger. What has that cost?",
        choices: [
          "Nothing — every property improves together",
          "Ductility and toughness can fall, and hydrogen stress corrosion becomes more of a risk",
          "The steel becomes harder to transport",
          "The elastic modulus rises with the strength",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "In some cases the increase in strength has been paid for by lowering the material's ductility and toughness.",
              visual: {
                kind: "scene",
                scene: "reinforcement",
                highlight: ["high-strength-bar"],
                labels: true,
              },
            },
            {
              text: "Higher-strength prestressing steel can also raise the risk of hydrogen stress corrosion — so strength is chosen, not simply maximised.",
              visual: {
                kind: "scene",
                scene: "reinforcement",
                highlight: ["strand", "high-strength-bar"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    // ── Concrete in the Bridge ─────────────────────────────────────────────
    "concrete-in-bridges": [
      {
        id: "concrete-in-the-bridge",
        type: "heading",
        text: "Concrete in the Bridge",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete",
          },
          caption: "Stone, paste and steel: three materials, mixed into one.",
        },
      },
      {
        id: "what-concrete-is",
        type: "paragraph",
        text: "Concrete is a heterogeneous multiphase composite — which is a careful way of saying that it is several materials in one. Graded stone and sand, the aggregate, are the strongest and cheapest part of it and the part that does not shrink. Cement paste — cement and water — is the glue that coats every stone and sets hard around them. And cast inside the hardened result, hidden from view, is steel: the reinforcing bars that take the tension concrete cannot.",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete",
            highlight: ["aggregate", "cement-paste", "rebar"],
          },
          caption: "Aggregate, cement paste and reinforcement: the three parts of a concrete member.",
        },
      },
      {
        id: "take-the-tour-of-concrete",
        type: "parts",
        prompt: "Take the tour: tap each part of the concrete.",
        scene: "concrete",
        hint: "Four pins — the last one is a test, not a material.",
      },
      {
        id: "while-it-is-fresh",
        type: "paragraph",
        text: "Concrete is judged twice: once while it is still fresh, and once for the rest of its life. Fresh concrete has to be workable — easy to mix, to transport, to place and to compact without separating. Workability is a bundle of properties rather than one: slump, the amount a cone of concrete sinks when its mould is lifted away; cohesion, so the mix does not segregate; water retention, so it does not bleed; and setting time, so it stays placeable long enough to be placed.",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete",
            highlight: ["slump"],
          },
          caption: "The slump test: one number for how easily the fresh concrete will move.",
        },
      },
      {
        id: "what-it-must-satisfy",
        type: "list",
        items: [
          "Workability — that it can be mixed, placed and compacted with the plant the site actually has.",
          "Strength — that it reaches the grade the design assumed, in compression above all.",
          "Durability — that it resists carbonation, chloride attack, freeze-thaw cycling and the corrosion of the steel inside it.",
          "Economy — that the whole job, and not just the material, comes out at a sensible cost.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "durability",
            highlight: ["carbonation", "chloride", "freeze-thaw", "corrosion"],
          },
          caption: "The durability the concrete is asked for is a list of attacks it must survive.",
        },
      },
      {
        id: "the-four-attacks-briefly",
        type: "paragraph",
        text: "Durability in concrete is mostly about keeping water and air away from the steel inside it. Carbon dioxide in the air carbonates the concrete round a bar until it can no longer protect it; chloride from sea air or from de-icing salt breaks down the film that protects the steel; water in the pores freezes, expands and cracks the concrete a little more each winter; and once a bar does start to rust it swells, and the swelling pushes the cover off from inside. All four are dealt with later in this module.",
        figure: {
          visual: {
            kind: "scene",
            scene: "durability",
            highlight: ["cover", "corrosion"],
          },
          caption: "Cover is the depth of sound concrete over the bar, and the first defence.",
        },
      },
      {
        id: "test-of-workability",
        type: "hotspot",
        prompt: "Tap the test that measures how workable fresh concrete is.",
        scene: "concrete",
        parts: ["aggregate", "cement-paste", "rebar", "slump"],
        answer: "slump",
        explanation: {
          steps: [
            {
              text: "Two of the pins are the materials the concrete is made of, and one is the steel cast inside it.",
              visual: {
                kind: "scene",
                scene: "concrete",
                highlight: ["aggregate", "cement-paste", "rebar"],
                labels: true,
              },
            },
            {
              text: "Workability is a property of the fresh mix, so the test has to be done before it sets — a cone of concrete is filled, the mould lifted, and the amount it sinks is measured.",
              visual: {
                kind: "scene",
                scene: "concrete",
                highlight: ["slump"],
                labels: true,
                caption: "Slump: the standard measure of how workable a fresh mix is.",
              },
            },
          ],
        },
      },
      {
        id: "file-each-requirement",
        type: "sort",
        prompt: "File each requirement under the heading it belongs to.",
        buckets: [
          { id: "workability", label: "Workability" },
          { id: "strength", label: "Strength" },
          { id: "durability", label: "Durability" },
        ],
        items: [
          { id: "slump", label: "Slump — how far a cone of the mix sinks", bucket: "workability" },
          { id: "cohesion", label: "Cohesion and water retention in the fresh mix", bucket: "workability" },
          { id: "cube", label: "Cube compressive strength at 28 days", bucket: "strength" },
          { id: "tensile", label: "Axial tensile strength", bucket: "strength" },
          { id: "carbonation", label: "Resistance to carbonation", bucket: "durability" },
          { id: "freeze", label: "Resistance to freeze-thaw cycling", bucket: "durability" },
        ],
        explanation: {
          steps: [
            {
              text: "Workability belongs to the fresh mix, strength to the hardened concrete, and durability to how long it lasts.",
              visual: {
                kind: "scene",
                scene: "concrete",
                highlight: ["slump"],
                labels: true,
              },
            },
            {
              text: "Slump, cohesion and water retention decide whether the concrete can be placed at all; the two strengths and the durability requirements decide whether it is any good once it is there.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["cube-test", "tensile-test"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "why-steel-inside-concrete",
        type: "choose",
        prompt: "Why is steel cast inside concrete at all?",
        choices: [
          "To make the concrete heavier",
          "Because concrete is weak in tension, and the steel takes the tension for it",
          "To stop the concrete shrinking",
          "Because the steel is cheaper than the aggregate",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Concrete is strong in compression and poor in tension — its tensile strength is a small fraction of its compressive strength.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["tensile-test"],
                labels: true,
              },
            },
            {
              text: "So bars are placed where tension will appear, and the two materials divide the job between them.",
              visual: {
                kind: "scene",
                scene: "concrete",
                highlight: ["rebar"],
                labels: true,
                caption: "Reinforcement: the steel that takes the tension for the concrete.",
              },
            },
          ],
        },
      },
      {
        id: "what-must-be-controlled-fresh",
        type: "choose",
        prompt: "Which of these has to be controlled while the concrete is still fresh?",
        choices: [
          "Its cube compressive strength",
          "Its slump, cohesion and setting time",
          "Its resistance to carbonation",
          "The depth of cover over the bars",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Strength and durability are properties of the hardened concrete, and cover is a matter of how the steel is detailed.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["cover", "carbonation"],
                labels: true,
              },
            },
            {
              text: "While it is fresh, what matters is whether the mix can be moved, placed and compacted — slump, cohesion, water retention and setting time.",
              visual: {
                kind: "scene",
                scene: "concrete",
                highlight: ["slump"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    // ── Concrete Strength ──────────────────────────────────────────────────
    "concrete-strength": [
      {
        id: "concrete-strength",
        type: "heading",
        text: "Concrete Strength",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-strength",
          },
          caption: "Three specimens, three strengths — and only one of them names the grade.",
        },
      },
      {
        id: "cube-compressive-strength",
        type: "paragraph",
        text: "Everything about concrete strength starts with a cube. The standard specimen is a 150 mm cube crushed between the platens of a testing machine, and the stress it fails at is the cubic compressive strength. That figure is the basis on which concrete is graded, and the grades run from C15 to C80 — fourteen of them, with each grade named after its characteristic cube strength in megapascals.",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-strength",
            highlight: ["cube-test", "strength-grade"],
          },
          caption: "A 150 mm cube, crushed: the number every concrete grade is named after.",
        },
      },
      {
        id: "take-the-tour-of-the-tests",
        type: "parts",
        prompt: "Take the tour: tap each specimen and figure.",
        scene: "concrete-strength",
        hint: "Four pins, and only one of them is a specimen rather than a result.",
      },
      {
        id: "axial-tensile-strength",
        type: "paragraph",
        text: "The axial tensile strength is measured on a 150 mm cube too, but it is a much smaller number: only about one eighth to one eighteenth of the cube strength. It is the key figure for crack resistance, and it is also used to reach related properties indirectly — the punching shear strength of a slab, or the bond between concrete and its reinforcement. The ratio gets worse as the grade rises: tensile strength grows more slowly than compressive strength, so a C80 cube is relatively even weaker in tension than a C15 one.",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-strength",
            highlight: ["tensile-test"],
          },
          caption: "Tensile strength: a small fraction of the cube, and a shrinking one as grades rise.",
        },
      },
      {
        id: "axial-compressive-prism-strength",
        type: "paragraph",
        text: "The axial compressive strength — also called the prism strength — is measured on a 150 × 150 × 300 mm prism. The shape matters: most concrete compression members in a real structure are prisms or cylinders rather than cubes, and a tall specimen is not strengthened by the friction of the testing machine's platens the way a cube is. The prism strength comes out at about 0.7 to 0.8 of the cube strength, and it is the value design uses for axially compressed members, such as the columns and the web members of a truss.",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-strength",
            highlight: ["prism-test"],
          },
          caption: "The prism: taller than it is wide, and closer to a real compression member.",
        },
      },
      {
        id: "standard-values-and-minimum-grades",
        type: "list",
        items: [
          "Concrete strength varies from batch to batch, so the standard value is taken from test results at a chosen guarantee rate rather than from a single cylinder.",
          "The design value is the standard value divided by the material partial factor for concrete, 1.45.",
          "Between C25 and C80 the highway bridge code tabulates the standard and design values in 5 MPa steps.",
          "Minimum grades: plain concrete C15, reinforced concrete C25, C30 or better where bars of 400 MPa or more are used, and prestressed concrete C40.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-strength",
            highlight: ["strength-grade"],
          },
          caption: "From a single test result to a design value, and to the least grade allowed.",
        },
      },
      {
        id: "test-that-names-the-grade",
        type: "hotspot",
        prompt: "Tap the specimen that gives the strength every concrete grade is named after.",
        scene: "concrete-strength",
        parts: ["cube-test", "prism-test", "tensile-test"],
        answer: "cube-test",
        explanation: {
          steps: [
            {
              text: "Two of these specimens look alike in section, and the odd one out is the tallest.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["prism-test", "tensile-test"],
                labels: true,
              },
            },
            {
              text: "The prism is taller than it is wide, and it gives the axial compressive strength — about 0.7 to 0.8 of the cube.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["prism-test"],
                labels: true,
              },
            },
            {
              text: "The grade is named after the 150 mm cube: C30 means a cube strength of 30 MPa, and nothing else.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["cube-test"],
                labels: true,
                caption: "The cube test: the specimen behind every concrete grade.",
              },
            },
          ],
        },
      },
      {
        id: "which-strength-for-a-column",
        type: "choose",
        prompt: "A reinforced concrete column is being checked for axial compression. Which strength belongs in the calculation?",
        choices: [
          "The cubic compressive strength",
          "The axial compressive, or prism, strength",
          "The axial tensile strength",
          "The modulus of elasticity",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "A column is a prism, not a cube, and it fails at a lower stress than a cube of the same concrete.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["prism-test"],
                labels: true,
              },
            },
            {
              text: "So the calculation for an axially compressed member is based on the axial compressive strength, which is 0.7 to 0.8 of the cube strength.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["prism-test", "cube-test"],
                labels: true,
                caption: "Prism strength for compressed members, cube strength for the grade.",
              },
            },
          ],
        },
      },
      {
        id: "order-the-design-chain",
        type: "order",
        prompt: "Put the chain from a test result to a design value in order.",
        items: [
          { id: "specimen", label: "A standard specimen is crushed and its strength measured" },
          { id: "standard-value", label: "The standard value is taken at a chosen guarantee rate, because strength varies" },
          { id: "partial-factor", label: "The standard value is divided by the material partial factor, 1.45" },
          { id: "design-value", label: "The design value is the number the structural calculation uses" },
        ],
        explanation: {
          steps: [
            {
              text: "A single cube proves very little, because concrete strength scatters from batch to batch.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["cube-test"],
                labels: true,
              },
            },
            {
              text: "Statistics turn many results into one standard value at a chosen guarantee rate, and the material factor then takes the design value below it.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["strength-grade"],
                labels: true,
                caption: "Test, standard value, design value: the chain a concrete strength travels.",
              },
            },
          ],
        },
      },
      {
        id: "minimum-grade-for-prestressed",
        type: "choose",
        prompt: "What is the lowest concrete grade a prestressed concrete member may use?",
        choices: ["C15", "C25", "C30", "C40"],
        answer: 3,
        explanation: {
          steps: [
            {
              text: "Prestressing works the concrete hard, so the minimum grade rises with the demands of the material.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["strength-grade"],
                labels: true,
              },
            },
            {
              text: "Plain concrete may be C15, reinforced concrete C25 — C30 where 400 MPa bars are used — and prestressed concrete C40.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["strength-grade"],
                labels: true,
                caption: "C15 plain, C25 reinforced, C30 with high-strength bars, C40 prestressed.",
              },
            },
          ],
        },
      },
    ],

    // ── Deformation & Elastic Modulus ──────────────────────────────────────
    "concrete-deformation": [
      {
        id: "deformation-and-elastic-modulus",
        type: "heading",
        text: "Deformation & Elastic Modulus",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-modulus",
          },
          caption: "Concrete moves twice over: when it is loaded, and when it is not.",
        },
      },
      {
        id: "two-kinds-of-deformation",
        type: "paragraph",
        text: "Concrete deforms in two quite different ways. The first is deformation under load — the strain produced by a monotonic short-term load, by a load that stays for years, and by a load repeated many millions of times. The second has nothing to do with the force applied at all: volume deformation, which is the shrinkage of concrete as it dries and hardens, and the expansion and contraction caused by temperature.",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-modulus",
            highlight: ["stress-strain", "shrinkage"],
          },
          caption: "Deformation under load, and deformation that happens with no load at all.",
        },
      },
      {
        id: "take-the-tour-of-deformation",
        type: "parts",
        prompt: "Take the tour: tap each behaviour and each measurement.",
        scene: "concrete-modulus",
        hint: "Four pins: two behaviours that happen over time, and two about stiffness.",
      },
      {
        id: "creep",
        type: "paragraph",
        text: "Creep is the slow one. Hold a constant stress on concrete and the strain does not stay constant with it: the concrete goes on shortening, year after year, under a load that never changes. In a long span this is not a detail — it is part of why a bridge settles towards the middle over its life, and it has to be estimated in the design rather than discovered on site.",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-modulus",
            highlight: ["creep"],
          },
          caption: "Creep: the same load, held for years, and a strain that keeps growing.",
        },
      },
      {
        id: "shrinkage-and-hardening",
        type: "paragraph",
        text: "Shrinkage happens without any load at all. As the cement hydrates and the concrete hardens in air, its volume reduces, and the concrete shortens. But neither creep nor shrinkage is free: both introduce additional internal forces into a statically indeterminate structure, where the members cannot shorten independently, and both cause loss of prestress in a prestressed bridge as the tendon's stretch is given back to the concrete. Both must be allowed for in the design calculation.",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-modulus",
            highlight: ["shrinkage", "creep"],
          },
          caption: "Shrinkage and creep steal prestress, and put forces into a statically indeterminate bridge.",
        },
      },
      {
        id: "concrete-is-elasto-plastic",
        type: "paragraph",
        text: "Concrete is a man-made heterogeneous multiphase composite, and it is not a perfectly elastic body. Load it and part of the deformation is elastic and comes back when the load is removed; part is plastic and stays. Under monotonic short-term loading its stress-strain relationship is not a straight line but a curve, so the ratio of stress to strain changes as the stress rises. That is why the elastic modulus of concrete is a much more complicated idea than the elastic modulus of steel, which at least has a straight line to measure.",
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-modulus",
            highlight: ["stress-strain"],
          },
          caption: "No straight line: the stress-strain curve of concrete bends as the load rises.",
        },
      },
      {
        id: "how-the-modulus-is-measured",
        type: "list",
        items: [
          "The specimen is a standard concrete prism, and the upper limit of stress is taken as 0.5 times its axial compressive strength.",
          "The prism is loaded to that limit and unloaded back to zero, and the cycle is repeated five to ten times.",
          "By then the deformation has largely settled and the stress-strain curve has become close to a straight line; the slope of that line is the elastic modulus of the concrete.",
          "The tensile modulus of elasticity is taken as equal to the compressive one, because measured values of the ratio average about 1.",
          "The shear modulus follows from elasticity theory: G = E / (2(1 + ν)), which at a Poisson's ratio of 0.2 gives exactly G = 0.4E.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "concrete-modulus",
            highlight: ["elastic-modulus"],
          },
          caption: "Load and unload, again and again, and the slope that settles out is the modulus.",
        },
      },
      {
        id: "strain-under-constant-stress",
        type: "hotspot",
        prompt: "Tap the behaviour in which strain grows under a stress that never changes.",
        scene: "concrete-modulus",
        parts: ["stress-strain", "elastic-modulus", "creep", "shrinkage"],
        answer: "creep",
        explanation: {
          steps: [
            {
              text: "Two of the pins are about how concrete is measured rather than how it behaves.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["stress-strain", "elastic-modulus"],
                labels: true,
              },
            },
            {
              text: "Of the two behaviours left, shrinkage happens with no load at all — it is the concrete drying and hardening.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["shrinkage"],
                labels: true,
              },
            },
            {
              text: "Creep is the one with the load held on it: constant stress, and a strain that goes on increasing with time.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["creep"],
                labels: true,
                caption: "Creep: constant stress, growing strain, and no way back.",
              },
            },
          ],
        },
      },
      {
        id: "order-the-modulus-test",
        type: "order",
        prompt: "Put the elastic modulus test in order.",
        items: [
          { id: "load", label: "Load the prism up to half its axial compressive strength" },
          { id: "unload", label: "Unload it back to zero" },
          { id: "repeat", label: "Repeat the loading and unloading five to ten times" },
          { id: "slope", label: "Take the slope of the line the curve has settled on" },
        ],
        explanation: {
          steps: [
            {
              text: "Half the axial compressive strength is the chosen upper limit: high enough to be measurable, low enough to stay in the usable range.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["elastic-modulus"],
                labels: true,
              },
            },
            {
              text: "Each cycle removes some of the plastic deformation, and after five to ten of them what is left is very nearly a straight line — whose slope is the modulus.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["stress-strain", "elastic-modulus"],
                labels: true,
                caption: "Load, unload, repeat: the settled slope is the elastic modulus.",
              },
            },
          ],
        },
      },
      {
        id: "shear-modulus-from-poisson",
        type: "choose",
        prompt: "Concrete has an elastic modulus E and a Poisson's ratio of 0.2. What is its shear modulus G?",
        choices: ["0.2E", "0.4E", "0.5E", "E"],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Elasticity theory gives the shear modulus as G = E / (2(1 + ν)), so everything depends on the Poisson's ratio.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["elastic-modulus"],
                labels: true,
              },
            },
            {
              text: "At ν = 0.2 that is E / 2.4, which is exactly 0.4E.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["elastic-modulus"],
                labels: true,
                caption: "G = E / (2(1 + ν)): with ν at 0.2, the shear modulus is 0.4E.",
              },
            },
          ],
        },
      },
      {
        id: "what-creep-and-shrinkage-do",
        type: "choose",
        prompt: "Creep and shrinkage both occur. What do they do to a bridge?",
        choices: [
          "Nothing that design needs to consider",
          "They introduce internal forces in statically indeterminate structures and cause prestress loss",
          "They increase the strength of the concrete",
          "They only affect the colour of the concrete",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "In a statically indeterminate structure the members cannot shorten freely, so shortening that is prevented becomes an internal force.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["rigid-joint"],
                labels: true,
              },
            },
            {
              text: "In a prestressed structure the same shortening gives back some of the tendon's stretch, which is prestress loss.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["creep", "shrinkage"],
                labels: true,
                caption: "Prevented shortening becomes force, and in a tendon it becomes lost prestress.",
              },
            },
          ],
        },
      },
    ],

    // ── Durability ─────────────────────────────────────────────────────────
    durability: [
      {
        id: "durability",
        type: "heading",
        text: "Durability",
        figure: {
          visual: {
            kind: "scene",
            scene: "durability",
          },
          caption: "Four ways a bridge ages early, and the cover that holds them back.",
        },
      },
      {
        id: "what-ends-a-bridge-early",
        type: "paragraph",
        text: "A bridge rarely fails because it was too weak on the day it opened. It ages because the environment gets at its materials: carbon dioxide in the air carbonates the concrete over the reinforcement, chloride from sea air or from winter de-icing salt works its way in, water in the pores freezes and expands with every winter, and the steel inside begins to corrode. Reinforcing steel corrosion is the one that does the visible damage, because rust takes up more room than the steel it came from: the bar swells, and the swelling pushes the cover off the bridge from the inside.",
        figure: {
          visual: {
            kind: "scene",
            scene: "durability",
            highlight: ["chloride", "carbonation", "freeze-thaw", "corrosion"],
          },
          caption: "Chloride, carbonation, freeze-thaw and corrosion: the four that end a life early.",
        },
      },
      {
        id: "take-the-tour-of-durability",
        type: "parts",
        prompt: "Take the tour: tap each attack, and then the defence.",
        scene: "durability",
        hint: "Five pins: four things that attack the concrete, and one thing that protects it.",
      },
      {
        id: "how-the-two-chemical-attacks-work",
        type: "paragraph",
        text: "The two chemical attacks are quiet. Chloride comes from sea air on a coastal crossing, or from the salt spread on a deck in winter; it penetrates the concrete and breaks down the passive film that keeps steel from rusting. Carbonation is the other: carbon dioxide from the atmosphere reacts with the concrete round a bar and turns it back towards chalk, and chalked concrete no longer protects the steel at all. Neither attack changes the look of the bridge until the damage is well advanced.",
        figure: {
          visual: {
            kind: "scene",
            scene: "durability",
            highlight: ["chloride", "carbonation"],
          },
          caption: "Chloride and carbonation both work out of sight, inside the cover.",
        },
      },
      {
        id: "freeze-thaw",
        type: "paragraph",
        text: "Freeze-thaw is the mechanical one. Water sits in the pores of the concrete, freezes, and expands; the ice cracks the concrete a little, the crack lets in more water, and the next winter does a little more. Nothing dramatic happens in any single year, which is exactly why it is easy to ignore and expensive to repair. Concrete that is saturated and exposed to repeated freezing is where it does most damage.",
        figure: {
          visual: {
            kind: "scene",
            scene: "durability",
            highlight: ["freeze-thaw"],
          },
          caption: "Water in the pores, frozen and thawed again, cracks the concrete from within.",
        },
      },
      {
        id: "how-durability-is-bought",
        type: "list",
        items: [
          "Enough cover — sufficient depth of sound concrete between the weather and the bar is the first and cheapest defence.",
          "Dense, low-permeability concrete, so that water, carbon dioxide and chloride cannot travel through it easily.",
          "A low water-cement ratio, because the water left over after the cement has set is what leaves the pores behind.",
          "The right grade for the exposure: a structure in a marine environment or a de-iced deck is not a structure in a dry inland valley.",
          "Design that keeps water off the structure — a deck that drains, a waterproofing membrane that is continuous, and details that do not trap water against concrete.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "waterproofing",
            highlight: ["waterproof-layer", "wearing-course"],
          },
          caption: "A membrane turned up at the kerb keeps rain out of the deck slab.",
        },
      },
      {
        id: "attack-that-arrives-with-salt",
        type: "hotspot",
        prompt: "Tap the attack that arrives with salt.",
        scene: "durability",
        parts: ["chloride", "carbonation", "freeze-thaw", "corrosion"],
        answer: "chloride",
        explanation: {
          steps: [
            {
              text: "Two of these are consequences felt at the steel, and one is a matter of ice.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["freeze-thaw", "corrosion"],
                labels: true,
              },
            },
            {
              text: "Carbonation comes from the air, and needs no salt at all.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["carbonation"],
                labels: true,
              },
            },
            {
              text: "Chloride is the one carried in by salt: sea air on a coastal bridge, and de-icing salt spread on the deck of an inland one.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["chloride"],
                labels: true,
                caption: "Chloride: salt from the sea or from the winter road, working into the cover.",
              },
            },
          ],
        },
      },
      {
        id: "file-each-attack",
        type: "sort",
        prompt: "File each description under the attack it describes.",
        buckets: [
          { id: "chloride", label: "Chloride" },
          { id: "carbonation", label: "Carbonation" },
          { id: "freeze", label: "Freeze-thaw" },
        ],
        items: [
          {
            id: "sea-air",
            label: "Salt carried inland by the wind from a coastal crossing",
            bucket: "chloride",
          },
          {
            id: "de-icing",
            label: "Salt spread on the deck through a cold winter",
            bucket: "chloride",
          },
          {
            id: "chalk",
            label: "Carbon dioxide turning the concrete round a bar towards chalk",
            bucket: "carbonation",
          },
          {
            id: "pore-ice",
            label: "Water in the pores expanding as it turns to ice",
            bucket: "freeze",
          },
        ],
        explanation: {
          steps: [
            {
              text: "Ask what the damage arrived in: salt, air, or water that froze.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["chloride", "carbonation", "freeze-thaw"],
                labels: true,
              },
            },
            {
              text: "Salt is chloride, the air brings carbon dioxide, and freezing water cracks the concrete it sits in.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["carbonation", "freeze-thaw"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "why-rust-breaks-the-cover",
        type: "choose",
        prompt: "A bar has started to rust. Why does the cover concrete come off the bridge?",
        choices: [
          "Because rust dissolves the concrete",
          "Because rust takes up more volume than the steel it formed from, and pushes the cover off from inside",
          "Because the bar shrinks as it rusts",
          "Because the concrete expands in the sun",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Rust is an oxide of iron, and it occupies a good deal more space than the steel it came from.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["corrosion"],
                labels: true,
              },
            },
            {
              text: "That expansion has nowhere to go but outwards, so it cracks and eventually spalls the cover — which lets in more water and more salt, and the corrosion accelerates.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["corrosion", "cover"],
                labels: true,
                caption: "Swelling rust, spalled cover: the expansion has to go somewhere.",
              },
            },
          ],
        },
      },
      {
        id: "cheapest-defence",
        type: "choose",
        prompt: "Which of these is the first defence of a bar against the weather?",
        choices: [
          "Paint on the concrete surface",
          "Enough cover of dense, low-permeability concrete",
          "Thicker reinforcing bars",
          "A higher tensile strength of bar",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "The attack has to travel through the cover before it can reach the steel, so depth of sound concrete buys time.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["cover"],
                labels: true,
              },
            },
            {
              text: "Dense concrete made with a low water-cement ratio slows that travel down as well, which is why cover and mix design are always specified together.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["cover", "carbonation"],
                labels: true,
                caption: "Cover and a dense mix: the two defences that cost almost nothing.",
              },
            },
          ],
        },
      },
    ],

    // ── Level Check: Choose the Material ───────────────────────────────────
    "materials-check": [
      {
        id: "level-check-choose-the-material",
        type: "heading",
        text: "Level Check: Choose the Material",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["Read the grade", "Name the test", "Match the attack"],
          },
          caption: "Three questions a designer asks before ordering a bridge.",
        },
      },
      {
        id: "the-whole-module-in-one-bridge",
        type: "paragraph",
        text: "Module 4 in one place. A designer settles the materials long before the first member is drawn: which steel the structure is bought to, which kind of steel goes where, which grade of concrete each part may use, and what the environment will do to all of it. Here is that work as a set of questions.",
        figure: {
          visual: {
            kind: "scene",
            scene: "materials",
            highlight: ["steel", "concrete"],
          },
          caption: "Two materials to choose, and a drawing that holds every choice.",
        },
      },
      {
        id: "steel-grade-for-the-cold",
        type: "hotspot",
        prompt: "Tap the part of the grade that tells you the steel is tough enough for a cold site.",
        scene: "steel-grade",
        parts: ["yield-letter", "yield-strength", "bridge-letter", "quality-grade"],
        answer: "quality-grade",
        explanation: {
          steps: [
            {
              text: "The Q and the number describe what the steel does under load, and the small q says which standard it was made to.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["yield-letter", "yield-strength", "bridge-letter"],
                labels: true,
              },
            },
            {
              text: "Only the quality grade speaks about temperature: D is impact-tested colder than C, and E and F colder still.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["quality-grade"],
                labels: true,
                caption: "Quality grade D: the letter that answers a cold site.",
              },
            },
          ],
        },
      },
      {
        id: "read-q420qe",
        type: "choose",
        prompt: "A viaduct in the north is specified as Q420qE. What has the designer asked for?",
        choices: [
          "Steel with a yield strength of 420 MPa, made to the bridge standard, at quality level E",
          "Concrete of grade C420 with an E-type admixture",
          "Steel with an ultimate strength of 420 MPa and no toughness requirement",
          "A reinforcing bar of 420 mm diameter",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "Read it in the same order every time: letter, number, letter, letter.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["yield-letter", "yield-strength"],
                labels: true,
              },
            },
            {
              text: "Q for the yield point, 420 MPa of it, q for bridge steel, and E for the highest ordinary quality level — a cold site, bought for.",
              visual: {
                kind: "scene",
                scene: "steel-grade",
                highlight: ["bridge-letter", "quality-grade"],
                labels: true,
                caption: "Q420qE: 420 MPa, bridge standard, quality level E.",
              },
            },
          ],
        },
      },
      {
        id: "file-each-piece-of-steel-again",
        type: "sort",
        prompt: "File each item under the kind of steel a bridge order would list it as.",
        buckets: [
          { id: "structural", label: "Structural steel" },
          { id: "reinforcing", label: "Reinforcing steel" },
          { id: "cable", label: "Cable steel" },
        ],
        items: [
          {
            id: "tower-plate",
            label: "Plate welded into the tower of a cable-stayed bridge",
            bucket: "structural",
          },
          {
            id: "deck-cage",
            label: "Ribbed bars forming the cage of a pier",
            bucket: "reinforcing",
          },
          {
            id: "stay-tendon",
            label: "Strand stressed to 0.75 of its standard strength in a stay",
            bucket: "cable",
          },
          {
            id: "main-cable",
            label: "Wire spun into a suspension bridge's main cable",
            bucket: "cable",
          },
          {
            id: "bar-thread",
            label: "A rolled-thread bar anchored with a nut in a segment joint",
            bucket: "reinforcing",
          },
        ],
        explanation: {
          steps: [
            {
              text: "Plate and rolled sections go into the structure itself; bars go inside concrete; wire and strand are pulled in tension.",
              visual: {
                kind: "scene",
                scene: "bridge-steel",
                highlight: ["structural-steel", "reinforcing-steel", "cable-steel"],
                labels: true,
              },
            },
            {
              text: "The stays and the main cable are both cable steel, however different the two bridges look.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["main-cable"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "put-each-attack-back",
        type: "assemble",
        prompt: "Put each attack back where it belongs on the drawing.",
        scene: "durability",
        slots: [
          { id: "chloride", label: "Chloride", at: [66, 60] },
          { id: "carbonation", label: "Carbonation", at: [160, 74] },
          { id: "freeze-thaw", label: "Freeze-thaw", at: [250, 66] },
          { id: "corrosion", label: "Reinforcing steel corrosion", at: [110, 112] },
        ],
        explanation: {
          steps: [
            {
              text: "Two of the attacks arrive from outside: salt on the wind, and carbon dioxide in the air.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["chloride", "carbonation"],
                labels: true,
              },
            },
            {
              text: "One is the weather at work on the water in the concrete, and the last is what happens to the bar once the first three have done their job.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["freeze-thaw", "corrosion"],
                labels: true,
                caption: "Attack from outside, damage inside: the order the four arrive in.",
              },
            },
          ],
        },
      },
      {
        id: "test-that-names-the-grade-again",
        type: "hotspot",
        prompt: "Tap the test that tells you which concrete grade has been delivered.",
        scene: "concrete-strength",
        parts: ["cube-test", "prism-test", "tensile-test"],
        answer: "cube-test",
        explanation: {
          steps: [
            {
              text: "The prism gives the strength used for an axially compressed member, and the tension test gives the crack resistance.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["prism-test", "tensile-test"],
                labels: true,
              },
            },
            {
              text: "The grade itself, from C15 to C80, is the 150 mm cube strength — so the cube is the specimen that names what was delivered.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["cube-test", "strength-grade"],
                labels: true,
                caption: "Cube strength is the grade; the other two tests answer other questions.",
              },
            },
          ],
        },
      },
      {
        id: "minimum-grade-again",
        type: "choose",
        prompt: "A deck is cast in reinforced concrete with 400 MPa bars. What is the lowest grade it may use?",
        choices: ["C15", "C25", "C30", "C40"],
        answer: 2,
        explanation: {
          steps: [
            {
              text: "Plain concrete may go down to C15, and reinforced concrete as a rule to C25.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["strength-grade"],
                labels: true,
              },
            },
            {
              text: "But where bars of 400 MPa or more are used, the minimum rises to C30 — the concrete has to be strong enough to work with the steel it is given.",
              visual: {
                kind: "scene",
                scene: "concrete-strength",
                highlight: ["strength-grade", "cube-test"],
                labels: true,
                caption: "C30: the floor for reinforced concrete using 400 MPa bars.",
              },
            },
          ],
        },
      },
      {
        id: "deformation-that-shrinks-the-concrete",
        type: "hotspot",
        prompt: "Tap the deformation that shortens the concrete as it dries, with no load on it at all.",
        scene: "concrete-modulus",
        parts: ["stress-strain", "elastic-modulus", "creep", "shrinkage"],
        answer: "shrinkage",
        explanation: {
          steps: [
            {
              text: "Creep also shortens concrete over the years, but it needs a stress held on the concrete to happen at all.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["creep"],
                labels: true,
              },
            },
            {
              text: "Shrinkage needs no load: the concrete loses volume as the cement hydrates and it hardens in air.",
              visual: {
                kind: "scene",
                scene: "concrete-modulus",
                highlight: ["shrinkage"],
                labels: true,
                caption: "Shrinkage: volume lost while the concrete hardens, with nothing loading it.",
              },
            },
          ],
        },
      },
      {
        id: "weathering-steel-again",
        type: "choose",
        prompt: "Why would a designer specify weathering steel for a bridge?",
        choices: [
          "Because it is stronger than every other bridge steel",
          "Because it resists atmospheric corrosion, so it can be left unpainted and costs least over its life",
          "Because it does not corrode at all",
          "Because it welds more easily than mild steel",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Weathering steel is ordinary steel with a small addition of alloying elements, and what those elements buy is corrosion resistance.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["corrosion"],
                labels: true,
              },
            },
            {
              text: "No coating means no repainting, and it is that whole-life cost, not the price of the plate, that comes out lowest of any structural steel.",
              visual: {
                kind: "scene",
                scene: "high-performance-steel",
                highlight: ["corrosion", "high-strength"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "order-the-materials-again",
        type: "order",
        prompt: "Put the four bridge materials in the order history adopted them.",
        items: [
          { id: "timber-first", label: "Timber — the beam bridge, and the rope suspension bridge" },
          { id: "stone-second", label: "Stone — the masonry arch, working in compression" },
          { id: "steel-third", label: "Steel — the material industry brought to bridging" },
          { id: "concrete-fourth", label: "Concrete — reinforced first, and then prestressed" },
        ],
        explanation: {
          steps: [
            {
              text: "Each material entered the record when it could do something the one before it could not.",
              visual: {
                kind: "scene",
                scene: "materials",
                highlight: ["timber", "stone"],
                labels: true,
              },
            },
            {
              text: "Steel brought reliable tension, and concrete brought a cheap material that could be moulded to any shape and then made to work in tension as well.",
              visual: {
                kind: "scene",
                scene: "materials",
                highlight: ["steel", "concrete"],
                labels: true,
                caption: "Timber, stone, steel, concrete: the order the history of bridges used them.",
              },
            },
          ],
        },
      },
      {
        id: "what-protects-the-steel",
        type: "choose",
        prompt: "A coastal crossing is being detailed. Which combination protects the reinforcement best?",
        choices: [
          "Thin cover with a rich mix, so the concrete is strong",
          "Adequate cover of dense, low-permeability concrete at a low water-cement ratio, plus detailing that takes water off the deck",
          "Wider cracks, so the water can drain out",
          "A higher grade of reinforcing bar",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Chloride has to travel through the cover to reach the bar, and dense concrete made with little water slows that journey right down.",
              visual: {
                kind: "scene",
                scene: "durability",
                highlight: ["cover", "chloride"],
                labels: true,
              },
            },
            {
              text: "And keeping the water off the structure in the first place — drainage and waterproofing — is what stops the attack ever starting.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["kerb-inlet", "downpipe"],
                labels: true,
                caption: "Cover, a dense mix and a deck that drains: three defences, working together.",
              },
            },
          ],
        },
      },
    ],
  },
};
