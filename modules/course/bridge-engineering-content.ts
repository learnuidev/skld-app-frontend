import type { CourseContentMap } from "./types";

export type { LessonBlock } from "./types";

/**
 * Bridge Engineering, lesson by lesson.
 *
 * The teaching is done on drawings: nearly every step puts a scene on the card
 * and asks the learner to find, name, sort, order or assemble something on it.
 * Authored from the course's own two modules — components and layout terms,
 * then classification and structural systems.
 */
export const bridgeEngineeringContent: CourseContentMap = {
  // ── Module 1 · Components of a Bridge ────────────────────────────────────
  "components-of-a-bridge": {
    "what-is-a-bridge": [
      { id: "what-is-a-bridge", type: "heading", text: "What Is a Bridge?" },
      {
        id: "bridge-load-bearing",
        type: "paragraph",
        text: "A bridge is a structure with load-bearing capacity, built so that traffic — cars, trains, people, water, pipes — can cross an obstacle: a river, a valley, or another road. It has to carry that traffic safely, and it has been doing so for longer than almost any other kind of engineering.",
      },
      {
        id: "every-bridge-same-drawing",
        type: "figure",
        scene: "overview",
        caption:
          "Every bridge, however long, is this same drawing: something that spans the gap, something that holds it up, and something that carries the load into the ground.",
      },
      {
        id: "take-the-tour",
        type: "parts",
        prompt: "Take the tour: tap each pin.",
        scene: "overview",
        hint: "Six pins, six parts. Tap one to find out what it does.",
      },
      {
        id: "not-what-a-bridge-does",
        type: "choose",
        prompt: "A bridge carries traffic over an obstacle. Which of these is NOT what a bridge does?",
        choices: [
          "Carries vehicles, trains and people across a river",
          "Removes the obstacle so nothing has to be crossed",
          "Carries a pipeline or a canal across a valley",
          "Resists the loads put on it without collapsing",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "A bridge never removes the obstacle. The river stays exactly where it is.",
            },
            {
              text: "What a bridge does is span the obstacle and carry the load across it safely.",
            },
            {
              text: "That is why bridges are described as structures with load-bearing capacity — the carrying is the whole job.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure", "span"],
                labels: true,
                caption: "The span crosses the river; the structure carries the traffic.",
              },
            },
          ],
        },
      },
      {
        id: "carries-traffic-across-gap",
        type: "hotspot",
        prompt: "Tap the part that carries the traffic across the gap.",
        scene: "overview",
        parts: ["superstructure", "pier", "abutment", "foundation"],
        answer: "superstructure",
        explanation: {
          steps: [
            { text: "Look for what the vehicles are actually driving on." },
            {
              text: "It is the long horizontal member spanning from one support to the next — the superstructure, or bridge span structure.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure"],
                labels: true,
                caption: "The superstructure: deck and beams, spanning between supports.",
              },
            },
          ],
        },
      },
      {
        id: "famous-chinese-bridges",
        type: "list",
        items: [
          "Zhaozhou Bridge in Hebei — a stone arch bridge, and a masterpiece of ancient bridge building.",
          "Anping Bridge in Quanzhou, Fujian — the world's longest stone beam bridge.",
          "The Shibanpo Yangtze River Bridge in Chongqing — a 330 m main span, the largest prestressed concrete continuous rigid frame in the country.",
          "Pingnan Third Bridge in Guangxi — a 575 m steel-concrete composite arch, the largest span of its kind in the world.",
          "Yangsigang Yangtze River Bridge — a 1700 m suspension span.",
        ],
      },
      {
        id: "bridge-as-art",
        type: "paragraph",
        text: "Beyond its transport job, a bridge has become a piece of three-dimensional art — and a record of what its age could build.",
      },
    ],

    superstructure: [
      { id: "the-superstructure", type: "heading", text: "The Superstructure" },
      {
        id: "superstructure-span-structure",
        type: "paragraph",
        text: "The superstructure — also called the bridge span structure — is the part that crosses the obstacle when the road is interrupted. It includes the bridge deck, the deck beams, and the main members that support them: main beams or slabs, arches, suspension cables.",
      },
      {
        id: "deck-in-section",
        type: "figure",
        scene: "superstructure",
        caption:
          "A deck in section. Traffic runs on the wearing surface; the slab spreads the wheel loads; the girder spans between supports and bends.",
      },
      {
        id: "name-each-deck-layer",
        type: "parts",
        prompt: "Tap each pin to name a layer of the deck.",
        scene: "superstructure",
      },
      {
        id: "deep-beam-between-supports",
        type: "hotspot",
        prompt: "Which part is the deep beam that spans between the supports?",
        scene: "superstructure",
        parts: ["paving", "deck-slab", "main-girder", "cross-beam"],
        answer: "main-girder",
        explanation: {
          steps: [
            { text: "The wheel load arrives at the top of the deck and travels downwards." },
            {
              text: "The wearing surface takes the wear, and the slab spreads the load sideways into the girders.",
            },
            {
              text: "The main girder is the deep member underneath — the one that actually spans the gap and bends.",
              visual: {
                kind: "scene",
                scene: "superstructure",
                highlight: ["main-girder"],
                labels: true,
                caption: "The main girder: the spanning member of the superstructure.",
              },
            },
          ],
        },
      },
      {
        id: "harder-than-a-floor",
        type: "choose",
        prompt: "Why is building a superstructure harder than building an ordinary building's floor?",
        choices: [
          "Because it must carry very large vehicle loads while spanning a large gap",
          "Because it is always built underwater",
          "Because it is made only of timber",
          "Because it has to be lighter than the traffic on it",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "A floor is supported all along its edges; a span has to reach across open space.",
            },
            {
              text: "So the superstructure must safely take big vehicle loads — and its own weight — over a comparatively large span.",
            },
            {
              text: "That combination is what makes span construction complex and difficult.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure", "span"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "deck-layers-in-order",
        type: "order",
        prompt: "Put the layers of the deck in order, from the traffic down to the spanning member.",
        items: [
          { id: "wearing", label: "Wearing surface — traffic rolls on it" },
          { id: "slab", label: "Deck slab — spreads the wheel load sideways" },
          { id: "girder", label: "Main girder — spans the gap and bends" },
        ],
        explanation: {
          steps: [
            { text: "Load always travels the way it was built to travel: in at the top, down to the supports." },
            {
              text: "Surface, then slab, then girder — and from the girder into the bearings.",
              visual: {
                kind: "scene",
                scene: "superstructure",
                highlight: ["paving", "deck-slab", "main-girder"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    bearings: [
      { id: "what-a-bearing-does", type: "heading", text: "Bearings" },
      {
        id: "bearing-connects-deck-to-pier",
        type: "paragraph",
        text: "A bearing is the small structural component that connects the superstructure to the substructure. It reliably transfers the reaction from the deck down to the pier — and just as importantly, it lets the deck move.",
      },
      {
        id: "bearings-on-a-pier-cap",
        type: "figure",
        scene: "bearings",
        caption:
          "Two bearings on a pier cap. Everything the deck carries passes through them, and they let the deck slide and rotate as it stretches in the heat.",
      },
      {
        id: "what-bearing-lets-deck-do",
        type: "choose",
        prompt: "Apart from passing the load down, what must a bearing allow the deck to do?",
        choices: [
          "Nothing — it should hold the deck completely rigid",
          "Deform: to displace and rotate",
          "Float upwards off the pier",
          "Change from concrete to steel",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "A bridge deck is not rigid. In summer it grows longer; under traffic it bends and rotates slightly.",
            },
            {
              text: "If the deck were clamped down, those movements would tear the structure apart.",
            },
            {
              text: "So the bearing allows displacement and rotation — which also keeps the real stress in the structure matching the calculated diagram.",
              visual: {
                kind: "scene",
                scene: "bearings",
                highlight: ["bearing"],
                labels: true,
                caption: "Slide and rotate: the two freedoms a bearing must give the deck.",
              },
            },
          ],
        },
      },
      {
        id: "lets-deck-move",
        type: "hotspot",
        prompt: "Tap the part that lets the deck move while it carries the load.",
        scene: "bearings",
        parts: ["main-girder", "bearing", "pier-cap", "pier"],
        answer: "bearing",
        explanation: {
          steps: [
            { text: "Follow the load downwards: girder, then what it rests on, then the pier." },
            {
              text: "Between the girder and the pier cap sit the bearings — the part that both transfers and releases.",
              visual: {
                kind: "scene",
                scene: "bearings",
                highlight: ["bearing"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "match-calculated-diagram",
        type: "choose",
        prompt: "A bridge designer says 'the real structure must match the calculated diagram'. What does the bearing have to do with that?",
        choices: [
          "Nothing — the drawing is only for the builder",
          "By letting the deck move as assumed, it keeps the real stresses equal to the calculated ones",
          "It makes the bridge heavier than calculated",
          "It removes the need for foundations",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Every calculation assumes the deck can slide and rotate at its supports.",
            },
            {
              text: "A bearing that jams makes the real structure behave differently from that assumption — and that is how unexpected cracks appear.",
            },
          ],
        },
      },
    ],

    "piers-and-abutments": [
      { id: "piers-and-abutments", type: "heading", text: "Piers & Abutments" },
      {
        id: "piers-and-abutments-substructure",
        type: "paragraph",
        text: "Piers and abutments together are the substructure: the supporting structure that receives the deck's dead load and the live load of vehicles and people, and passes it to the foundation.",
      },
      {
        id: "abutment-at-each-end",
        type: "paragraph",
        text: "The support at each end of the bridge is an abutment. It connects to the road embankment and resists the horizontal earth pressure of the fill, so the bank cannot slide or collapse. A support in the middle of the span is a pier — and a single-span bridge has no pier at all.",
      },
      {
        id: "end-of-bridge-pins",
        type: "parts",
        prompt: "Tap the pins to see how the end of a bridge is finished.",
        scene: "supports",
      },
      {
        id: "two-kinds-of-support",
        type: "sort",
        prompt: "Sort these into the two kinds of support.",
        buckets: [
          { id: "end", label: "At the ends of the bridge" },
          { id: "middle", label: "In the middle of the span" },
        ],
        items: [
          { id: "abutment", label: "Abutment — connects to the embankment", bucket: "end" },
          { id: "earth", label: "Resists horizontal earth pressure", bucket: "end" },
          { id: "pier", label: "Pier — stands between the spans", bucket: "middle" },
          { id: "none", label: "Is missing entirely on a single-span bridge", bucket: "middle" },
        ],
        explanation: {
          steps: [
            { text: "Abutments are at the ends: they are what the road runs onto, and what holds the earth back." },
            {
              text: "Piers are in the middle: they carry the deck between spans. A single-span bridge has none.",
              visual: {
                kind: "scene",
                scene: "supports",
                highlight: ["abutment", "pier"],
                labels: true,
                caption: "Abutment at the end, pier in the middle.",
              },
            },
          ],
        },
      },
      {
        id: "resists-earth-pressure",
        type: "hotspot",
        prompt: "Tap the support that resists the earth pressure of the embankment.",
        scene: "supports",
        parts: ["transition-slab", "abutment", "cone-slope", "pier"],
        answer: "abutment",
        explanation: {
          steps: [
            { text: "Look at the end the road arrives from. The fill behind it is pushing all the time." },
            {
              text: "The abutment takes that horizontal push, and the deck sits on top of it.",
              visual: {
                kind: "scene",
                scene: "supports",
                highlight: ["abutment", "embankment"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "cone-slope-transition-slab",
        type: "choose",
        prompt: "What are the two extra pieces at the end of a bridge for?",
        choices: [
          "The cone slope protects the bank, and the transition slab keeps the road smooth as the fill settles",
          "They are both decorative",
          "They collect rainwater from the deck",
          "They carry the deck's load into the piles",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "At the junction of embankment and abutment there is always movement: the fill settles over time.",
            },
            {
              text: "Stone cone-slope protection keeps the bank stable; the transition slab, resting on the fill, rotates as it settles.",
            },
            {
              text: "That way a settling embankment does not leave a bump where the vehicle leaves the bridge.",
              visual: {
                kind: "scene",
                scene: "supports",
                highlight: ["cone-slope", "transition-slab"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    foundations: [
      { id: "bridge-foundations", type: "heading", text: "Foundations" },
      {
        id: "what-a-foundation-does",
        type: "paragraph",
        text: "The foundation is the bottom part of the piers and abutments that transfers all their loads into the ground. It is the key to a bridge being safe to use — and because it is often buried deep in soil, and sometimes built underwater, it is one of the most difficult parts of the whole job.",
      },
      {
        id: "pier-on-a-pile-cap",
        type: "figure",
        scene: "foundations",
        caption:
          "A pier on a pile cap, with piles driven down to the bearing stratum. Everything above the ground is only as good as what is under it.",
      },
      {
        id: "buried-parts-of-bridge",
        type: "parts",
        prompt: "Tap the buried parts of the bridge.",
        scene: "foundations",
      },
      {
        id: "load-path-to-the-ground",
        type: "order",
        prompt: "Put the load path in order — from the traffic to the ground.",
        items: [
          { id: "traffic", label: "Vehicles and pedestrians" },
          { id: "deck", label: "Deck and main girder" },
          { id: "bearing", label: "Bearings" },
          { id: "pier", label: "Pier or abutment" },
          { id: "foundation", label: "Foundation piles" },
          { id: "soil", label: "The bearing stratum" },
        ],
        explanation: {
          steps: [
            {
              text: "Every load a bridge carries follows one path, and it always ends in the ground.",
            },
            {
              text: "Traffic → deck → bearings → pier → foundation → bearing stratum.",
              visual: {
                kind: "scene",
                scene: "foundations",
                highlight: ["pile-cap", "pile", "bearing-stratum"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "spreads-pier-load",
        type: "hotspot",
        prompt: "Tap the buried part that spreads the pier's load into the ground.",
        scene: "foundations",
        parts: ["pier", "pile-cap", "bearing-stratum"],
        answer: "pile-cap",
        explanation: {
          steps: [
            { text: "The pier stands in the air; the ground is far below." },
            {
              text: "Between them is the pile cap, gathering the pier's load and handing it to every pile at once.",
              visual: {
                kind: "scene",
                scene: "foundations",
                highlight: ["pile-cap"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "hardest-part-to-build",
        type: "choose",
        prompt: "Why are foundations usually the hardest part of building a bridge?",
        choices: [
          "Because they are made of the most expensive steel",
          "Because they are deep in the soil or underwater, where working is difficult",
          "Because they must be removed once the bridge opens",
          "Because they carry less load than the deck",
        ],
        answer: 1,
        explanation: {
          steps: [
            { text: "Above ground, work is open and visible. Below ground, it is neither." },
            {
              text: "Foundations are buried deep, and sometimes have to be built underwater — so they need special techniques.",
            },
            {
              text: "They also carry the whole bridge, which is why nobody economises on them.",
              visual: {
                kind: "scene",
                scene: "foundations",
                highlight: ["pile", "bearing-stratum"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    fittings: [
      { id: "fittings-and-facilities", type: "heading", text: "Fittings & Facilities" },
      {
        id: "structure-is-only-half",
        type: "paragraph",
        text: "The structure is only half of a bridge. The rest is what makes it usable: deck paving, drainage and waterproofing, railings or crash barriers, expansion joints, and lighting. Urban bridges also reserve ducts for pipelines crossing the bridge, and sometimes build revetments and diversion works as needed.",
      },
      {
        id: "find-each-fitting",
        type: "parts",
        prompt: "Find each fitting on the deck.",
        scene: "fittings",
      },
      {
        id: "three-jobs-fittings-do",
        type: "concepts",
        prompt: "Three jobs the fittings do.",
        concepts: [
          {
            id: "safe",
            label: "They keep traffic safe on the deck",
            summary: "Railings, crash barriers, paving and lighting — everything that makes the deck usable and safe.",
            scene: "fittings",
            highlight: ["railing", "paving"],
          },
          {
            id: "dry",
            label: "They keep water out of the structure",
            summary:
              "Waterproofing and drainage: rain is caught and piped off the bridge before it can soak into the concrete and rust the steel inside it.",
            scene: "fittings",
            highlight: ["drain"],
          },
          {
            id: "move",
            label: "They let the bridge move",
            summary:
              "The expansion joint is a gap that opens and closes as the deck grows in summer and shrinks in winter.",
            scene: "fittings",
            highlight: ["expansion-joint"],
          },
        ],
      },
      {
        id: "deck-grow-and-shrink",
        type: "hotspot",
        prompt: "Tap the fitting that lets the deck grow and shrink without cracking.",
        scene: "fittings",
        parts: ["railing", "paving", "expansion-joint", "drain"],
        answer: "expansion-joint",
        explanation: {
          steps: [
            { text: "A long deck changes length with the temperature, every single day." },
            {
              text: "The expansion joint is a gap that opens and closes with it — the yellow marks on the deck.",
            },
            {
              text: "Seal it, and keep the surface able to move: that is the whole job of the joint.",
              visual: {
                kind: "scene",
                scene: "fittings",
                highlight: ["expansion-joint"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "sort-fittings-by-job",
        type: "sort",
        prompt: "Sort each fitting by the job it does.",
        buckets: [
          { id: "traffic", label: "Keeps traffic safe on the deck" },
          { id: "water", label: "Keeps water out of the structure" },
          { id: "movement", label: "Lets the bridge move" },
        ],
        items: [
          { id: "railing", label: "Railing and crash barrier", bucket: "traffic" },
          { id: "lighting", label: "Lighting", bucket: "traffic" },
          { id: "paving", label: "Deck paving", bucket: "traffic" },
          { id: "drain", label: "Drainage and waterproofing", bucket: "water" },
          { id: "joint", label: "Expansion joint", bucket: "movement" },
        ],
        explanation: {
          steps: [
            { text: "The main function of these facilities is to improve how the bridge serves the people using it." },
            {
              text: "Some protect the traffic, some protect the structure from water, and some let the structure move.",
              visual: {
                kind: "scene",
                scene: "fittings",
                highlight: ["railing", "drain", "expansion-joint"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "water-quiet-enemy",
        type: "choose",
        prompt: "Water is a bridge's quiet enemy. Which fitting handles it?",
        choices: [
          "The railing",
          "The drainage and waterproofing system",
          "The expansion joint",
          "The lighting",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "Rain landing on the deck would soak into the concrete and rust the steel inside it.",
            },
            {
              text: "So the deck is waterproofed and drained: water is collected and piped off the bridge.",
            },
            {
              text: "A blocked drain is a structural problem years later.",
              visual: {
                kind: "scene",
                scene: "fittings",
                highlight: ["drain"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "reading-the-drawing": [
      { id: "reading-the-drawing", type: "heading", text: "Reading the Drawing" },
      {
        id: "water-levels-explained",
        type: "paragraph",
        text: "The water level in a river changes constantly. The lowest level in the dry season is the low water level. The highest seen in flood season is the high water level. The level calculated for the flood the bridge is designed to pass is the design flood level. The level at which boats can still navigate normally is the navigable water level.",
      },
      {
        id: "name-each-level-line",
        type: "parts",
        prompt: "Tap each level line to name it.",
        scene: "levels",
      },
      {
        id: "water-levels-in-order",
        type: "order",
        prompt: "Put the water levels in order, lowest first.",
        items: [
          { id: "low", label: "Low water level — the dry season" },
          { id: "nav", label: "Navigable water level — boats can still pass" },
          { id: "design", label: "Design flood level — the flood the bridge is designed for" },
          { id: "high", label: "High water level — the highest flood on record" },
        ],
        explanation: {
          steps: [
            { text: "Start from the river bed and work upwards." },
            {
              text: "Low water, then navigable, then the design flood, and at the top the highest flood ever seen.",
            },
            {
              text: "Spans are measured at the design flood level, because that is the level the bridge must pass.",
              visual: {
                kind: "scene",
                scene: "levels",
                highlight: ["design-flood-level", "navigable-level"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "space-a-boat-needs",
        type: "hotspot",
        prompt: "Tap the space a boat needs to pass under the deck.",
        scene: "levels",
        parts: ["clearance", "navigable-level", "design-flood-level", "low-water-level"],
        answer: "clearance",
        explanation: {
          steps: [
            { text: "A boat does not need a level — it needs room." },
            {
              text: "The clearance is the space kept free under the bottom of the superstructure for navigation.",
            },
            {
              text: "The same idea applies over the deck: the clearance above the road belongs to the traffic on it.",
              visual: {
                kind: "scene",
                scene: "levels",
                highlight: ["clearance"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "four-letters-dimensions",
        type: "figure",
        scene: "dimensions",
        caption:
          "Four letters do most of the work on a bridge drawing: l₀ the net span, l the computed span, L the total bridge length, h the construction height.",
      },
      {
        id: "measurement-engineers-calculate",
        type: "hotspot",
        prompt: "Tap the measurement engineers actually calculate with.",
        scene: "dimensions",
        parts: ["net-span", "computed-span", "bridge-length"],
        answer: "computed-span",
        explanation: {
          steps: [
            { text: "The net span l₀ is the clear opening — the waterway between two piers." },
            {
              text: "The computed span l is measured centre to centre of the supports.",
            },
            {
              text: "Structural calculations are based on l, not on the clear opening.",
              visual: {
                kind: "scene",
                scene: "dimensions",
                highlight: ["computed-span", "net-span"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "allowable-construction-height",
        type: "choose",
        prompt: "The construction height h must never be greater than the allowable construction height. What is the allowable height?",
        choices: [
          "The height of the tallest pier",
          "The difference between the deck level from the route alignment and the top of the clearance boundary",
          "The depth of the river at flood level",
          "Twice the computed span",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "The road has to arrive at a fixed level, and the boats or traffic underneath need their own clear space.",
            },
            {
              text: "Whatever is left between those two is the allowable construction height.",
            },
            {
              text: "If the structure will not fit, engineers arrange it above the deck — as cable-stayed, suspension and through-arch bridges do.",
              visual: {
                kind: "scene",
                scene: "dimensions",
                highlight: ["construction-height", "bridge-length"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "components-check": [
      { id: "level-check-name-that-part", type: "heading", text: "Level Check: Name That Part" },
      {
        id: "module-one-in-one-drawing",
        type: "paragraph",
        text: "Module 1 in one drawing. Everything you have learned is on this bridge — find it, name it, and read the numbers off it.",
      },
      {
        id: "build-the-bridge",
        type: "assemble",
        prompt: "Build the bridge: put every part where it belongs.",
        scene: "overview",
        slots: [
          { id: "superstructure", label: "Deck", at: [120, 95] },
          { id: "pier", label: "Pier", at: [202, 131] },
          { id: "abutment", label: "Abutment", at: [40, 125] },
          { id: "foundation", label: "Foundation", at: [118, 161] },
        ],
        explanation: {
          steps: [
            { text: "Start with what carries the traffic, then what holds it up." },
            {
              text: "Deck on top, piers and abutments underneath, foundations buried below them all.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure", "pier", "abutment", "foundation"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "deck-load-to-pier",
        type: "hotspot",
        prompt: "Tap the part that transfers the load from the deck to the pier.",
        scene: "overview",
        parts: ["superstructure", "bearing", "abutment", "foundation", "pier"],
        answer: "bearing",
        explanation: {
          steps: [
            { text: "It is the smallest part on the drawing — and nothing gets past it." },
            {
              text: "The bearing sits between the deck and the support, transferring the load down and letting the deck move.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["bearing"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "file-each-part",
        type: "sort",
        prompt: "File each part under what it is.",
        buckets: [
          { id: "super", label: "Superstructure" },
          { id: "sub", label: "Substructure" },
          { id: "fittings", label: "Fittings and facilities" },
        ],
        items: [
          { id: "deck", label: "Bridge deck and main girder", bucket: "super" },
          { id: "arch", label: "Arch ring", bucket: "super" },
          { id: "pier", label: "Pier", bucket: "sub" },
          { id: "abutment", label: "Abutment", bucket: "sub" },
          { id: "piles", label: "Foundation piles", bucket: "sub" },
          { id: "drain", label: "Drainage and waterproofing", bucket: "fittings" },
          { id: "joint", label: "Expansion joint", bucket: "fittings" },
        ],
        explanation: {
          steps: [
            { text: "The superstructure spans; the substructure supports; the fittings make it usable." },
            {
              text: "Bearings are the joint between the first two — which is exactly why they matter so much.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure", "pier", "abutment"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "flood-water-gets-through",
        type: "choose",
        prompt: "A multi-span bridge crosses a river. Flood water has to get through. Which measurement tells you how much room the river has?",
        choices: [
          "The construction height h",
          "The total span Σl₀ — the sum of the net spans",
          "The bridge length L",
          "The deck paving thickness",
        ],
        answer: 1,
        explanation: {
          steps: [
            { text: "The net span is the clear opening of one span, measured at the design flood level." },
            {
              text: "Add up all the net spans of a multi-span bridge and you have the total span Σl₀.",
            },
            {
              text: "That figure is what reflects the bridge's ability to discharge flood water.",
              visual: {
                kind: "scene",
                scene: "levels",
                highlight: ["design-flood-level", "clearance"],
                labels: true,
              },
            },
          ],
        },
      },
    ],
  },

  // ── Module 2 · Bridge Classification ─────────────────────────────────────
  "bridge-classification": {
    "six-ways": [
      { id: "six-ways-to-sort", type: "heading", text: "Six Ways to Sort" },
      {
        id: "why-engineers-sort-bridges",
        type: "paragraph",
        text: "We meet bridges every day: a small footbridge on the way to work, or a bridge that turns a journey into a view. To study them systematically, engineers sort them — and there is more than one way to sort the same bridge.",
      },
      {
        id: "six-ways-classification",
        type: "concepts",
        prompt: "Six ways to sort the bridge.",
        concepts: [
          {
            id: "material",
            label: "By material",
            summary:
              "What the load-bearing structure is made of: reinforced concrete, steel, or one of the newer high-performance materials.",
            scene: "superstructure",
            highlight: ["main-girder"],
          },
          {
            id: "purpose",
            label: "By purpose",
            summary: "Who or what the bridge exists for — and it is not always people.",
            scene: "carries",
            highlight: ["roadway", "railway", "footpath"],
          },
          {
            id: "span",
            label: "By span",
            summary:
              "How far one span reaches — from a few metres to more than two kilometres, and every metre of it is measured from support to support.",
            scene: "dimensions",
            highlight: ["net-span", "computed-span"],
          },
          {
            id: "deck-position",
            label: "By deck position",
            summary:
              "Where the traffic sits in the structure: on top of it, inside it, or through its middle.",
            scene: "deck-position",
          },
          {
            id: "crossing",
            label: "By nature of crossing",
            summary: "What the bridge goes over: a river, the sea, or another road.",
            scene: "levels",
            highlight: ["clearance"],
          },
          {
            id: "system",
            label: "By structural system",
            summary:
              "How the load is actually carried: beam, arch, rigid frame, cable-stayed or suspension.",
            scene: "composite",
          },
        ],
      },
      {
        id: "sort-questions-into-ways",
        type: "sort",
        prompt: "Now sort these questions into the six ways bridges are classified.",
        buckets: [
          { id: "material", label: "By material" },
          { id: "purpose", label: "By purpose" },
          { id: "span", label: "By span" },
          { id: "position", label: "By deck position" },
          { id: "crossing", label: "By nature of crossing" },
          { id: "system", label: "By structural system" },
        ],
        items: [
          { id: "rc", label: "Reinforced concrete or steel?", bucket: "material" },
          { id: "rail", label: "Railway or highway?", bucket: "purpose" },
          { id: "small", label: "Is 25 m a small or a medium bridge?", bucket: "span" },
          { id: "through", label: "Does the traffic run on top of the structure or inside it?", bucket: "position" },
          { id: "sea", label: "River, sea, or another road?", bucket: "crossing" },
          { id: "arch", label: "Beam, arch, cable-stayed or suspension?", bucket: "system" },
        ],
        explanation: {
          steps: [
            { text: "The first five look at a bridge from the outside: what it is made of, what it is for, how far it reaches, where the traffic sits, what it crosses." },
            {
              text: "The sixth is different. The structural system is about how the load is carried — and that decides everything else.",
              visual: {
                kind: "scene",
                scene: "composite",
                labels: true,
                caption: "The same bridge can be described six ways; only one of them explains how it works.",
              },
            },
          ],
        },
      },
      {
        id: "nature-of-crossing",
        type: "choose",
        prompt: "Which of these is a classification by the nature of the crossing?",
        choices: [
          "A pedestrian bridge",
          "A cross-sea bridge",
          "A continuous beam bridge",
          "A prestressed concrete bridge",
        ],
        answer: 1,
        explanation: {
          steps: [
            { text: "Nature of crossing asks what the bridge goes over: a river, the sea, or another road." },
            {
              text: "River-crossing, cross-sea and overpass are the answers. A movable bridge is used when ships need the waterway itself.",
            },
          ],
        },
      },
    ],

    "by-material": [
      { id: "by-material", type: "heading", text: "By Material" },
      {
        id: "most-widely-used-material",
        type: "paragraph",
        text: "The most widely used bridge material is reinforced concrete. Steel is used where light weight matters most. Beyond those come the high-performance materials: ultra-high performance concrete (UHPC) for the ribs of box arches, and carbon-fibre reinforced polymer (CFRP) cables in cable-stayed bridges.",
      },
      {
        id: "material-choice-made-visible",
        type: "figure",
        scene: "cable-stayed",
        caption:
          "Material choice made visible: the girder, the tower and the stays of this one bridge are each made of the material that suits the force in them — and the stays are where the newest materials are being tried.",
      },
      {
        id: "material-belongs-to-job",
        type: "sort",
        prompt: "Which material belongs to which job?",
        buckets: [
          { id: "concrete", label: "Concrete" },
          { id: "steel", label: "Steel" },
          { id: "advanced", label: "High-performance material" },
        ],
        items: [
          { id: "rc", label: "The everyday material of bridge building", bucket: "concrete" },
          { id: "prestress", label: "Prestressed concrete beams for medium spans", bucket: "concrete" },
          { id: "girder", label: "Steel plate girders, light for their strength", bucket: "steel" },
          { id: "stays", label: "High-strength wire stay cables", bucket: "steel" },
          { id: "uhpc", label: "UHPC for the ribs of a box arch", bucket: "advanced" },
          { id: "cfrp", label: "CFRP stay cables — strong, but costly to anchor", bucket: "advanced" },
        ],
        explanation: {
          steps: [
            { text: "Reinforced concrete is the workhorse: cheap, strong, and easy to shape." },
            { text: "Steel is chosen when a lighter structure buys a longer span." },
            {
              text: "UHPC and CFRP are newer: they outperform both, but the cost and the anchoring technology still limit their use.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["stay-cable"],
                labels: true,
                caption: "CFRP stays have been tried, but material cost and anchoring limit them.",
              },
            },
          ],
        },
      },
      {
        id: "steel-for-long-spans",
        type: "choose",
        prompt: "Why do long-span bridges often use steel for the main girder?",
        choices: [
          "Because steel is cheaper than concrete",
          "Because a lighter girder reduces the load the cables or arch must carry",
          "Because steel never corrodes",
          "Because concrete cannot be used in long spans at all",
        ],
        answer: 1,
        explanation: {
          steps: [
            {
              text: "In a cable-stayed bridge, every kilogram of girder has to be carried by the stays.",
            },
            {
              text: "Making the girder lighter lets more of that capacity carry traffic instead — so the span can grow.",
            },
          ],
        },
      },
    ],

    "by-purpose": [
      { id: "by-purpose", type: "heading", text: "By Purpose" },
      {
        id: "groups-bridges-serve",
        type: "paragraph",
        text: "Bridges serve different groups of people: railway bridges, highway bridges, pedestrian bridges, road-rail bridges, and waterway bridges. Water crossing structures include aqueducts and inverted siphon bridges, and inside factories there are transport bridges and pipeline bridges.",
      },
      {
        id: "crab-bridge-australia",
        type: "paragraph",
        text: "Not every bridge is for people. In Australia a bridge was built for wildlife: crabs making their yearly migration across a road. The principle behind it matters in bridge engineering — pay attention to environmental protection and ecological sustainability.",
      },
      {
        id: "who-the-bridge-serves",
        type: "concepts",
        prompt: "Bridges by purpose.",
        concepts: [
          {
            id: "vehicles",
            label: "Vehicles and trains",
            summary:
              "Highway bridges, urban road bridges and railway bridges — and bridges that carry road and rail together.",
            scene: "carries",
            highlight: ["roadway", "railway"],
          },
          {
            id: "people",
            label: "People",
            summary: "A pedestrian bridge, or a footbridge over a busy road, keeping walkers clear of the traffic.",
            scene: "carries",
            highlight: ["footpath"],
          },
          {
            id: "pipes",
            label: "Pipes and goods",
            summary:
              "Pipeline bridges, the transport bridges inside a factory, and the ducts left in a road bridge for services.",
            scene: "carries",
            highlight: ["pipe-duct"],
          },
          {
            id: "water",
            label: "Water",
            summary:
              "An aqueduct carrying a canal, or an inverted siphon carrying a stream across a valley — and under any waterway bridge, boats keep their clearance.",
            scene: "carries",
            highlight: ["waterway"],
          },
        ],
      },
      {
        id: "sort-bridges-by-group",
        type: "sort",
        prompt: "Now sort these bridges by the group each one serves.",
        buckets: [
          { id: "vehicles", label: "Vehicles or trains" },
          { id: "people", label: "People" },
          { id: "other", label: "Water, pipes or wildlife" },
        ],
        items: [
          { id: "railway", label: "Railway bridge", bucket: "vehicles" },
          { id: "highway", label: "Highway bridge", bucket: "vehicles" },
          { id: "urban", label: "Urban road bridge", bucket: "vehicles" },
          { id: "ped", label: "Pedestrian bridge", bucket: "people" },
          { id: "pedestrian-crossing", label: "Footbridge over a highway", bucket: "people" },
          { id: "aqueduct", label: "Aqueduct carrying a canal", bucket: "other" },
          { id: "pipeline", label: "Pipeline bridge", bucket: "other" },
          { id: "crab", label: "Crab migration bridge", bucket: "other" },
        ],
        explanation: {
          steps: [
            { text: "Purpose is about who or what needs to get across — and sometimes it is not people at all." },
            {
              text: "Aqueducts carry water, pipeline bridges carry pipes, and some bridges exist purely for wildlife.",
            },
            {
              text: "A design that respects the environment is now part of good bridge engineering.",
              visual: {
                kind: "scene",
                scene: "overview",
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "what-crab-bridge-shows",
        type: "choose",
        prompt: "What does the crab bridge in Australia show about bridge engineering?",
        choices: [
          "That bridges must always be built for traffic first",
          "That environmental protection and ecological sustainability are part of the design brief",
          "That bridges for animals are cheaper than bridges for people",
          "That all bridges must be movable bridges",
        ],
        answer: 1,
        explanation: {
          steps: [
            { text: "The bridge was built so that crabs could migrate safely, not to carry vehicles." },
            {
              text: "It is a reminder that protecting the environment belongs in the design principles, alongside strength and cost.",
            },
          ],
        },
      },
    ],

    "by-span": [
      { id: "by-span", type: "heading", text: "By Span" },
      {
        id: "small-medium-large-spans",
        type: "paragraph",
        text: "Design specifications classify bridges by total length and by single span: small, medium, large and extra-large. Span is also the number that decides which structural system makes sense — beam, arch, cable-stayed or suspension.",
      },
      {
        id: "drag-the-span",
        type: "span",
        prompt: "Drag the span and watch the bridge change system.",
      },
      {
        id: "suspension-most-economical",
        type: "choose",
        prompt: "Beyond roughly 1000 m, which type is generally considered the most economical?",
        choices: ["Beam", "Arch", "Cable-stayed", "Suspension"],
        answer: 3,
        explanation: {
          steps: [
            { text: "Up to about 600 m an arch can be the reasonable economic choice, and cable-stayed bridges now reach beyond 1100 m." },
            {
              text: "But once the main span passes about 1000 m, a suspension bridge is generally considered the most economical type.",
            },
            {
              text: "Six of the ten longest suspension bridges in the world are in China — the longest-spanning is the Yangsigang Yangtze River Bridge at 1700 m.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["main-cable", "hanger", "stiffening-girder"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "standard-span-under-30m",
        type: "choose",
        prompt: "Concrete beam bridges are widely used for small to medium spans. What is the usual standard span for them?",
        choices: ["Under 30 m", "30 to 100 m", "100 to 300 m", "Over 300 m"],
        answer: 0,
        explanation: {
          steps: [
            { text: "Standard spans for concrete beam bridges are mostly under 30 m." },
            {
              text: "As the span grows, prestressed concrete continuous beams or continuous rigid frames take over — like the 330 m main span of the Shibanpo Yangtze River Bridge.",
            },
            {
              text: "Every system has a span where it stops being the sensible answer, and another takes its place.",
              visual: {
                kind: "scene",
                scene: "beam",
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "deck-position": [
      { id: "where-the-deck-sits", type: "heading", text: "Where the Deck Sits" },
      {
        id: "three-deck-positions",
        type: "paragraph",
        text: "Classified by the relative position of the bridge deck and the main load-bearing structure, bridges come in three kinds: the deck (or upper-support) bridge, where traffic runs on top; the through (or bottom-support) bridge, where traffic runs inside the structure; and the half-through (or middle-support) bridge, where the deck cuts across the middle.",
      },
      {
        id: "arch-bridges-side-view",
        type: "figure",
        scene: "deck-position",
        caption:
          "Three arch bridges seen from the side: the deck on top, the deck at the bottom chord, and the deck through the middle of the arch.",
      },
      {
        id: "tour-the-three-deck-positions",
        type: "parts",
        prompt: "Take the tour: tap each pin and read where its deck sits.",
        scene: "deck-position",
        hint: "Three pins, three bridges. Tap one to find where the traffic runs in that structure.",
      },
      {
        id: "structure-above-traffic",
        type: "hotspot",
        prompt: "Tap the bridge where part of the structure stands above the traffic.",
        scene: "deck-position",
        parts: ["deck-bridge", "through-bridge", "half-through-bridge"],
        answer: "half-through-bridge",
        explanation: {
          steps: [
            { text: "Read each drawing from the traffic's point of view." },
            { text: "On the top drawing the structure is entirely below; on the second, entirely above." },
            {
              text: "Only the third has structure both below and above the roadway — a half-through bridge.",
              visual: {
                kind: "scene",
                scene: "deck-position",
                highlight: ["half-through-bridge"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "why-a-through-bridge",
        type: "choose",
        prompt: "Why would an engineer choose a through bridge instead of a deck bridge?",
        choices: [
          "To let the structure rise above the traffic when there is no room for it below",
          "Because it is always cheaper",
          "Because it needs no foundations",
          "Because it cannot be made of steel",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "A through arch raises its arch above the roadway, so the arch can be tall without the bridge being built high off the ground.",
            },
            {
              text: "It also keeps the construction height under the deck small — which is exactly what the allowable construction height demands.",
            },
          ],
        },
      },
    ],

    "beam-bridges": [
      { id: "beam-bridges", type: "heading", text: "Beam Bridges" },
      {
        id: "simplest-bridge-of-all",
        type: "paragraph",
        text: "A beam laid on a pier gives the simplest bridge of all: the simply supported beam bridge. Under a vertical load, a beam's supports produce only vertical reactions — no horizontal force — and the main beam is primarily in bending. That is why beam bridges are built from materials that resist bending well, such as steel and reinforced concrete.",
      },
      {
        id: "three-beam-bridges",
        type: "concepts",
        prompt: "The three beam bridges.",
        concepts: [
          {
            id: "simply-supported",
            label: "Simply supported",
            summary:
              "One span resting on two supports. The simplest beam bridge there is, and the easiest to build.",
            scene: "beam",
            highlight: ["simply-supported"],
          },
          {
            id: "continuous",
            label: "Continuous",
            summary:
              "The girder runs unbroken over the piers, so neighbouring spans help each other and the ride is smoother.",
            scene: "beam",
            highlight: ["continuous"],
          },
          {
            id: "cantilever",
            label: "Cantilever",
            summary:
              "Arms reach out from the piers, with a hanging span between them, joined at complex details.",
            scene: "beam",
            highlight: ["cantilever"],
          },
        ],
      },
      {
        id: "tour-the-three-beam-bridges",
        type: "parts",
        prompt: "Take the tour: tap each pin and name the three beam bridges.",
        scene: "beam",
        hint: "Three pins, one per drawing: simply supported on top, continuous in the middle, cantilever at the bottom.",
      },
      {
        id: "sort-beam-bridges",
        type: "sort",
        prompt: "Sort these beam bridges by how they behave.",
        buckets: [
          { id: "simple", label: "Simply supported" },
          { id: "continuous", label: "Continuous" },
          { id: "cantilever", label: "Cantilever" },
        ],
        items: [
          { id: "easiest", label: "Simple stress, easy to build, used for short spans", bucket: "simple" },
          { id: "smooth", label: "Vehicles ride more smoothly because the girder is unbroken over the piers", bucket: "continuous" },
          { id: "common", label: "Neighbouring spans help each other, so this is the usual choice on highways and city roads", bucket: "continuous" },
          { id: "holes", label: "Has hanging spans between the cantilever ends", bucket: "cantilever" },
          { id: "weak", label: "The joints at the ends are a weak point where defects appear", bucket: "cantilever" },
        ],
        explanation: {
          steps: [
            { text: "A simply supported span is the simplest to analyse and build, which is why short spans use it." },
            {
              text: "A continuous girder ties the spans together at the piers: the spans help each other, and the ride is smoother.",
            },
            {
              text: "Cantilever bridges need a complex connection between the cantilever end and the hanging span. That joint is a weak point, so they are rarely used today.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["cantilever"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "weak-point-at-the-ends",
        type: "hotspot",
        prompt: "Tap the beam bridge whose ends are the weak point of the structure.",
        scene: "beam",
        parts: ["simply-supported", "continuous", "cantilever"],
        answer: "cantilever",
        explanation: {
          steps: [
            { text: "Look for the drawing with two separate pieces meeting in the middle." },
            {
              text: "The cantilever ends carry a hanging span between them, and the connection there needs a complex detail.",
            },
            {
              text: "Defects are very likely to appear at that detail — which is why cantilever bridges are now rarely used.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["cantilever"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "only-vertical-reactions",
        type: "choose",
        prompt: "A beam bridge's supports produce only vertical reactions. What does that tell you about the main beam?",
        choices: [
          "It is mainly in compression",
          "It is mainly in bending, so it should be built from a material strong in bending",
          "It carries no load at all",
          "It must be an arch",
        ],
        answer: 1,
        explanation: {
          steps: [
            { text: "No horizontal reaction means no arch-like thrust: the beam simply bends." },
            {
              text: "So the material must be strong in bending — steel, reinforced concrete, or prestressed concrete.",
            },
          ],
        },
      },
    ],

    "arch-bridges": [
      { id: "arch-bridges", type: "heading", text: "Arch Bridges" },
      {
        id: "main-arch-ring",
        type: "paragraph",
        text: "The main load-bearing member of an arch bridge is the main arch ring. Under a vertical load there is a horizontal thrust at the arch foot — and the bending moment that thrust creates has the opposite sign to the one the vertical load creates. The two cancel out, so the arch ring has small bending moments and shear, and is mainly in compression.",
      },
      {
        id: "arch-in-compression",
        type: "figure",
        scene: "arch",
        caption:
          "Above: an arch in compression, pushing outwards at its feet. Below: a tied arch, where a tie between the feet balances that thrust.",
      },
      {
        id: "tour-the-arch-bridge",
        type: "parts",
        prompt: "Take the tour: tap each pin on the arch bridge.",
        scene: "arch",
        hint: "Four pins: the ring, the deck it carries, the thrust at its foot, and the tie that cancels it.",
      },
      {
        id: "pushes-into-the-ground",
        type: "hotspot",
        prompt: "Tap the force an arch bridge pushes into the ground.",
        scene: "arch",
        parts: ["arch-ring", "thrust", "tie-rod", "superstructure"],
        answer: "thrust",
        explanation: {
          steps: [
            { text: "An arch works in compression, so its feet push outwards as the load comes down." },
            {
              text: "That push is the horizontal thrust, and it is what the foundation of a through-arch bridge must be able to take.",
            },
            {
              text: "Where the ground cannot take it, the arch is turned into a tied arch.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["thrust"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "tie-between-arch-feet",
        type: "choose",
        prompt: "What does a tie between the arch feet do?",
        choices: [
          "It balances the thrust, so the foundation does not have to resist it",
          "It makes the arch ring bend more",
          "It replaces the deck",
          "It carries the traffic itself",
        ],
        answer: 0,
        explanation: {
          steps: [
            { text: "The tie pulls the two arch feet towards each other — exactly the opposite of what the thrust does." },
            {
              text: "With the thrust balanced inside the bridge, the foundation no longer has to be big enough to resist it.",
            },
            {
              text: "This is the tied arch bridge, and it is why arches can be used on softer ground.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["tie-rod"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "why-arch-spans-further",
        type: "choose",
        prompt: "Compared with a beam bridge of the same span, why does an arch bridge span so much further?",
        choices: [
          "Because its bending moment, shear and deformation are all much smaller",
          "Because it is made of lighter concrete",
          "Because it does not need foundations",
          "Because it has no dead load",
        ],
        answer: 0,
        explanation: {
          steps: [
            { text: "In an arch, the thrust cancels most of the bending: the ring is mainly in compression." },
            {
              text: "With small bending, shear and deformation, the arch has a great spanning capacity — the arches now under construction exceed 600 m.",
            },
            {
              text: "Where the ground allows it, an arch is often the economically reasonable choice — and its curve is beautiful.",
            },
          ],
        },
      },
    ],

    "rigid-frames": [
      { id: "rigid-frames", type: "heading", text: "Rigid Frames" },
      {
        id: "beam-and-piers-combined",
        type: "paragraph",
        text: "A rigid frame bridge is one where the beam and the piers are integrally combined. The piers are fixed to the beam, so they take part in the beam's bending — which improves the bridge's resistance to bending, and lets the structure be shallower.",
      },
      {
        id: "three-frame-types",
        type: "figure",
        scene: "frame",
        caption:
          "Portal frame, inclined-leg frame, and continuous frame. The yellow squares are the rigid joints, where pier and beam are cast as one.",
      },
      {
        id: "tour-the-rigid-frames",
        type: "parts",
        prompt: "Take the tour: tap each pin on the rigid frames.",
        scene: "frame",
        hint: "Four pins: the portal, inclined-leg and continuous frames, and the rigid joint they all depend on.",
      },
      {
        id: "different-from-beam-bridge",
        type: "hotspot",
        prompt: "Tap the joint that makes a rigid frame different from a beam bridge.",
        scene: "frame",
        parts: ["rigid-joint", "portal-frame", "inclined-leg", "continuous-frame"],
        answer: "rigid-joint",
        explanation: {
          steps: [
            { text: "The biggest difference from a beam bridge is how the pier and the beam are connected." },
            {
              text: "In a beam bridge the deck rests on bearings. In a rigid frame the pier and beam are fixed together at a rigid joint.",
            },
            {
              text: "Because the joint cannot rotate freely, the piers help the beam bend — and the mid-span bending moment becomes smaller than a simply supported beam's of the same span.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["rigid-joint", "portal-frame"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "trade-off-at-rigid-joint",
        type: "choose",
        prompt: "What is the trade-off at the rigid joint?",
        choices: [
          "The structure is lighter but cannot carry vehicles",
          "The stiffness is high, so the negative bending moment there is large and ordinary reinforced concrete tends to crack",
          "It makes the bridge shorter",
          "It removes the need for a foundation",
        ],
        answer: 1,
        explanation: {
          steps: [
            { text: "Where the pier and beam meet, the structure is very stiff." },
            { text: "That attracts a large negative bending moment, and ordinary reinforced concrete cracks under it." },
            {
              text: "Rigid frames also pick up extra internal forces from temperature change and uneven settlement of the foundations — so the design of this joint is careful work.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["rigid-joint"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "flexible-piers-yunnan",
        type: "choose",
        prompt: "Continuous rigid frame bridges are common in the mountains of Yunnan. Why are their piers usually made more flexible?",
        choices: [
          "To reduce the extra internal forces a highly indeterminate structure picks up",
          "To make them cheaper to paint",
          "Because flexible piers carry no load",
          "To let the deck float away in a flood",
        ],
        answer: 0,
        explanation: {
          steps: [
            { text: "A continuous frame is multiply statically indeterminate: temperature and settlement make it develop secondary internal forces." },
            {
              text: "Making the piers slender and flexible softens that effect — giving the high-pier, long-span continuous rigid frame used in mountain valleys.",
            },
          ],
        },
      },
    ],

    "cable-stayed": [
      { id: "cable-stayed-bridges", type: "heading", text: "Cable-Stayed Bridges" },
      {
        id: "three-main-parts",
        type: "paragraph",
        text: "A cable-stayed bridge has three main parts: the stay cables, the main girder, and the tower. Without the stays, the girder would behave like a three-span continuous beam under the traffic load. Add the towers and cables, and everything changes.",
      },
      {
        id: "row-of-invisible-piers",
        type: "figure",
        scene: "cable-stayed",
        caption:
          "The stays pull the girder upwards at many points, like a row of invisible piers. That is why a cable-stayed girder can be lighter and span further than a beam.",
      },
      {
        id: "tour-the-cable-stayed-bridge",
        type: "parts",
        prompt: "Take the tour: tap each pin on the cable-stayed bridge.",
        scene: "cable-stayed",
        hint: "Five pins: the tower, the stays, the girder they hold, the anchor, and the support the stays stand in for.",
      },
      {
        id: "lifts-the-girder",
        type: "hotspot",
        prompt: "Tap the member that lifts the girder at many points.",
        scene: "cable-stayed",
        parts: ["tower", "stay-cable", "main-girder", "anchor"],
        answer: "stay-cable",
        explanation: {
          steps: [
            { text: "Follow the load from the girder upwards." },
            {
              text: "The vertical component of each stay cable gives the girder a multi-point, vertical, elastic support.",
            },
            {
              text: "It is exactly as if a series of invisible piers stood under the girder — the bending moment drops, the girder can be lighter, and the span can grow.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["stay-cable", "elastic-support"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "what-limits-the-span",
        type: "choose",
        prompt: "What limits how far a cable-stayed bridge can span?",
        choices: [
          "The weight of the stay cables, which sag and reduce the stiffness of the bridge",
          "The colour of the tower",
          "The number of pedestrians",
          "The width of the deck",
        ],
        answer: 0,
        explanation: {
          steps: [
            { text: "As the span grows, the cables get longer and heavier." },
            { text: "Their own weight makes them sag, and a sagging cable is a less stiff cable." },
            {
              text: "That loss of stiffness is the main reason the cable-stayed span cannot grow indefinitely — the largest built so far is a little over 1100 m.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "sort-parts-by-force",
        type: "sort",
        prompt: "What does each part of a cable-stayed bridge have to do?",
        buckets: [
          { id: "tension", label: "Mainly in tension" },
          { id: "compression", label: "Mainly in compression" },
          { id: "both", label: "Bending and compression together" },
        ],
        items: [
          { id: "cable", label: "Stay cables of high-strength wire", bucket: "tension" },
          { id: "tower", label: "The tower", bucket: "compression" },
          { id: "girder", label: "The main girder", bucket: "both" },
        ],
        explanation: {
          steps: [
            { text: "The cables carry tension; the tower takes the vertical components downwards as compression." },
            {
              text: "The horizontal components of the stays push the girder towards the tower, so the girder is a compression-and-bending member.",
            },
            {
              text: "The tower can be steel or reinforced concrete; for a long span the girder is usually steel, to keep its weight down.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["tower", "stay-cable", "main-girder"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "two-cable-problems",
        type: "choose",
        prompt: "Two problems with high-strength wire stay cables have to be taken seriously. Which pair?",
        choices: [
          "Colour and weight",
          "Corrosion and fatigue",
          "Length and price of the tower",
          "Wind and rain",
        ],
        answer: 1,
        explanation: {
          steps: [
            { text: "Stay cables are thin, highly stressed, and out in the weather." },
            {
              text: "Corrosion and fatigue are the two defects that must be treated carefully — which is also why CFRP cables are being tried, despite their cost and anchoring difficulty.",
            },
          ],
        },
      },
    ],

    "suspension-and-composite": [
      { id: "suspension-and-combined-systems", type: "heading", text: "Suspension & Combined Systems" },
      {
        id: "hangs-the-whole-span",
        type: "paragraph",
        text: "A suspension bridge hangs the whole span from a strong cable carried over the towers. The cable is the main load-bearing member. Hangers drop from it to lift the deck structure — in a suspension bridge the deck is called the stiffening girder — and the ends of the cable are anchored in massive blocks called anchorages.",
      },
      {
        id: "the-force-path",
        type: "figure",
        scene: "suspension",
        caption:
          "The force path is clear: deck → hangers → main cable → towers → foundations, with the anchorages holding the cable's pull at each end.",
      },
      {
        id: "tour-the-suspension-bridge",
        type: "parts",
        prompt: "Take the tour: tap each pin on the suspension bridge.",
        scene: "suspension",
        hint: "Five pins: the towers, the main cable, the hangers, the stiffening girder they lift, and the anchorages that hold the cable.",
      },
      {
        id: "stops-cable-pulling-towers",
        type: "hotspot",
        prompt: "Tap the part that stops the main cable pulling the towers over.",
        scene: "suspension",
        parts: ["main-cable", "hanger", "stiffening-girder", "anchorage"],
        answer: "anchorage",
        explanation: {
          steps: [
            { text: "The main cable is in tension, so its ends are pulling hard inwards." },
            { text: "Those ends are tied down into huge anchorage blocks at each end of the bridge." },
            {
              text: "Without the anchorage there would be nothing to resist the cable — the towers would simply be pulled over.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["anchorage", "main-cable"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "wind-stability-matters",
        type: "choose",
        prompt: "A suspension bridge spans further than anything else. What must always be watched carefully?",
        choices: [
          "Its stiffness is low, so it deforms and vibrates under lateral wind load — wind stability matters most as spans grow",
          "Its cable is too short",
          "Its deck is too heavy to lift",
          "Its anchorages are made of timber",
        ],
        answer: 0,
        explanation: {
          steps: [
            { text: "Hangers support the stiffening girder at many points, so its bending is small — that is why the system spans so far." },
            { text: "But the same lightness means low stiffness: the structure moves under wind." },
            {
              text: "As suspension spans break new records, wind-resistance stability becomes one of the most important things in design and construction.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["stiffening-girder", "hanger"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "two-cable-systems",
        type: "sort",
        prompt: "Sort the two cable systems by what is true of each.",
        buckets: [
          { id: "stayed", label: "Cable-stayed" },
          { id: "suspended", label: "Suspension" },
        ],
        items: [
          { id: "fan", label: "Stays run straight from the tower to the girder", bucket: "stayed" },
          { id: "sag", label: "The main cable sags between the towers", bucket: "suspended" },
          { id: "anchors", label: "Large anchorages hold the cable ends", bucket: "suspended" },
          { id: "grid", label: "The deck is a stiffening girder held by hangers", bucket: "suspended" },
          { id: "stiff", label: "Stiffer, and now built beyond 1100 m", bucket: "stayed" },
          { id: "strong", label: "The strongest spanning system — over 2000 m built", bucket: "suspended" },
        ],
        explanation: {
          steps: [
            { text: "In a cable-stayed bridge the stays are straight and go directly to the girder: the system is stiff." },
            { text: "In a suspension bridge one cable sags across the span and hangers lift the deck from it." },
            {
              text: "The suspension bridge spans further; the cable-stayed bridge is stiffer and needs no giant anchorages.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["main-cable", "hanger"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "find-each-combined-bridge",
        type: "parts",
        prompt: "When systems are combined, new bridges appear. Find each one.",
        scene: "composite",
      },
      {
        id: "why-combine-systems",
        type: "choose",
        prompt: "Why combine two structural systems in one bridge?",
        choices: [
          "So the strengths of each make up for the weaknesses of the other",
          "To make the bridge harder to calculate",
          "Because one system alone is never allowed",
          "To use more material than necessary",
        ],
        answer: 0,
        explanation: {
          steps: [
            { text: "A beam and an arch can carry a load together, each doing what it does best." },
            { text: "A beam bridge can be given a few stays to take some of its bending." },
            {
              text: "A cable-stayed bridge and a suspension bridge can be combined so the stays stiffen the ends while the suspended cable spans the middle.",
            },
            {
              text: "A sensible combination of systems gives complementary advantages — that is the whole point of a composite bridge.",
              visual: {
                kind: "scene",
                scene: "composite",
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "classification-check": [
      { id: "level-check-match-system", type: "heading", text: "Level Check: Match the System" },
      {
        id: "five-structural-systems",
        type: "paragraph",
        text: "Every bridge in this module is one of five structural systems, plus the composites that mix them. Here is the whole module in one set of questions.",
      },
      {
        id: "compression-in-curved-ring",
        type: "hotspot",
        prompt: "Tap the system that carries its load by compression in a curved ring.",
        scene: "composite",
        parts: ["beam-arch", "partial-cable-stayed", "cable-suspension"],
        answer: "beam-arch",
        explanation: {
          steps: [
            { text: "Look for the drawing with a curve in it." },
            {
              text: "An arch ring works mainly in compression, and the horizontal thrust at its feet cancels most of the bending from the load.",
            },
            {
              text: "That is the beam-and-arch combination: the arch ring takes the compression, the beam takes what is left of the bending.",
              visual: {
                kind: "scene",
                scene: "composite",
                highlight: ["beam-arch"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "match-bridge-to-system",
        type: "sort",
        prompt: "Match each bridge to the system that carries it.",
        buckets: [
          { id: "beam", label: "Beam" },
          { id: "arch", label: "Arch" },
          { id: "frame", label: "Rigid frame" },
          { id: "cable", label: "Cable system" },
        ],
        items: [
          { id: "shibanpo", label: "Shibanpo Yangtze River Bridge — 330 m, prestressed concrete, continuous", bucket: "frame" },
          { id: "pingnan", label: "Pingnan Third Bridge — 575 m steel-concrete composite", bucket: "arch" },
          { id: "chaotianmen", label: "Chaotianmen Yangtze River Bridge — a long-span arch", bucket: "arch" },
          { id: "yangsigang", label: "Yangsigang Yangtze River Bridge — 1700 m main span", bucket: "cable" },
          { id: "zhanggao", label: "Zhanggao Yangtze crossing — 2300 m planned main span", bucket: "cable" },
          { id: "shortspan", label: "A standard span under 30 m in concrete", bucket: "beam" },
        ],
        explanation: {
          steps: [
            { text: "Start with the span: short spans bend, medium spans can arch, and only cable systems reach the very long spans." },
            {
              text: "Pingnan Third and Chaotianmen are arches; Yangsigang and Zhanggao are suspension bridges; Shibanpo is a continuous rigid frame.",
            },
            {
              text: "Six of the world's ten largest arch bridges are in China, and six of the ten longest suspension bridges too.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["main-cable", "tower", "anchorage"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "systems-by-span-reach",
        type: "order",
        prompt: "Order these systems by how far they reach — shortest span first.",
        items: [
          { id: "beam", label: "Beam — the simplest system, for short spans" },
          { id: "frame", label: "Rigid frame — long spans in mountain valleys" },
          { id: "arch", label: "Arch — great spanning capacity in compression" },
          { id: "stayed", label: "Cable-stayed — built beyond 1100 m" },
          { id: "suspended", label: "Suspension — the strongest of all, over 2000 m built" },
        ],
        explanation: {
          steps: [
            { text: "Think about how each system carries its load, and how much bending is left in the girder." },
            {
              text: "Beam, then rigid frame and arch, then cable-stayed, then suspension.",
            },
            {
              text: "Beyond about 1000 m, suspension is generally the most economical type.",
              visual: {
                kind: "scene",
                scene: "composite",
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "pedestrian-bridge-over-stream",
        type: "choose",
        prompt: "One last one. A pedestrian bridge over a small stream, 20 m wide, in a park. Which system is the sensible choice?",
        choices: [
          "A suspension bridge, because it looks impressive",
          "A simple beam or small arch bridge — the span is short, so the simple system is the economic one",
          "A cable-stayed bridge with a 40 m tower",
          "A 2300 m suspension span",
        ],
        answer: 1,
        explanation: {
          steps: [
            { text: "Every classification in this module leads to the same question: what does this span need?" },
            {
              text: "At 20 m, a beam or a small arch is simple, cheap and appropriate — great spanning capacity is not needed.",
            },
            {
              text: "Where conditions permit, building an arch is often an economically reasonable choice — and for a short span, so is a beam.",
            },
          ],
        },
      },
    ],
  },
};
