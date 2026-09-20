import { bridgeMaterialsContent } from "./bridge-materials-content";
import type { CourseContentMap } from "./types";

export type { LessonBlock } from "./types";

/**
 * Bridge Engineering, lesson by lesson.
 *
 * The teaching is done on drawings: nearly every step puts a scene on the card
 * and asks the learner to find, name, sort, order or assemble something on it.
 * Authored from the course's own modules — components and layout terms,
 * classification and structural systems, then the deck layout and the
 * materials. Module 4 lives in `bridge-materials-content.ts`, which is long
 * enough to be worth its own file.
 */
export const bridgeEngineeringContent: CourseContentMap = {
  // ── Module 1 · Components of a Bridge ────────────────────────────────────
  "components-of-a-bridge": {
    "what-is-a-bridge": [
      {
        id: "what-is-a-bridge",
        type: "heading",
        text: "What Is a Bridge?",
        figure: {
          visual: {
            kind: "scene",
            scene: "overview",
          },
          caption: "There are six parts on this bridge, and you will be able to name every one of them.",
        },
      },
      {
        id: "bridge-load-bearing",
        type: "paragraph",
        text: "A bridge is a structure with load-bearing capacity, built so that traffic — cars, trains, people, water, pipes — can cross an obstacle: a river, a valley, or another road. It has to carry that traffic safely, and it has been doing so for longer than almost any other kind of engineering.",
        figure: {
          visual: {
            kind: "scene",
            scene: "carries",
            highlight: ["roadway", "railway", "footpath", "pipe-duct"],
          },
          caption: "One deck can hold a road, a rail track, a walkway and a pipe run at the same time.",
        },
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
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["span"],
                labels: true,
              },
            },
            {
              text: "What a bridge does is span the obstacle and carry the load across it safely.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure"],
                labels: true,
              },
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
            {
              text: "Look for what the vehicles are actually driving on.",
              visual: {
                kind: "scene",
                scene: "overview",
                labels: true,
              },
            },
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
        figure: {
          visual: {
            kind: "scene",
            scene: "composite",
          },
          caption: "Beam, arch and cable are the three families those records belong to.",
        },
      },
      {
        id: "bridge-as-art",
        type: "paragraph",
        text: "Beyond its transport job, a bridge has become a piece of three-dimensional art — and a record of what its age could build.",
        figure: {
          visual: {
            kind: "scene",
            scene: "cable-stayed",
            highlight: ["tower", "stay-cable"],
          },
          caption: "A fan of stays is a shape people recognise from a great distance.",
        },
      },
    ],

    superstructure: [
      {
        id: "the-superstructure",
        type: "heading",
        text: "The Superstructure",
        figure: {
          visual: {
            kind: "scene",
            scene: "superstructure",
          },
          caption: "Three jobs in one deck: wear on the surface, spread in the slab, span in the girder.",
        },
      },
      {
        id: "superstructure-span-structure",
        type: "paragraph",
        text: "The superstructure — also called the bridge span structure — is the part that crosses the obstacle when the road is interrupted. It includes the bridge deck, the deck beams, and the main members that support them: main beams or slabs, arches, suspension cables.",
        figure: {
          visual: {
            kind: "scene",
            scene: "superstructure",
            highlight: ["main-girder", "cross-beam"],
          },
          caption: "The deck's own weight is carried by these deep beams, not by the surface you see.",
        },
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
            {
              text: "The wheel load arrives at the top of the deck and travels downwards.",
              visual: {
                kind: "scene",
                scene: "superstructure",
                highlight: ["paving"],
                labels: true,
              },
            },
            {
              text: "The wearing surface takes the wear, and the slab spreads the load sideways into the girders.",
              visual: {
                kind: "scene",
                scene: "superstructure",
                highlight: ["paving", "deck-slab"],
                labels: true,
              },
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
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["span"],
                labels: true,
              },
            },
            {
              text: "So the superstructure must safely take big vehicle loads — and its own weight — over a comparatively large span.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure"],
                labels: true,
              },
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
            {
              text: "Load always travels the way it was built to travel: in at the top, down to the supports.",
              visual: {
                kind: "scene",
                scene: "superstructure",
                highlight: ["paving"],
                labels: true,
              },
            },
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
      {
        id: "what-a-bearing-does",
        type: "heading",
        text: "Bearings",
        figure: {
          visual: {
            kind: "scene",
            scene: "bearings",
            highlight: ["bearing"],
          },
          caption: "Small enough to miss, and everything the deck carries passes through it.",
        },
      },
      {
        id: "bearing-connects-deck-to-pier",
        type: "paragraph",
        text: "A bearing is the small structural component that connects the superstructure to the substructure. It reliably transfers the reaction from the deck down to the pier — and just as importantly, it lets the deck move.",
        figure: {
          visual: {
            kind: "scene",
            scene: "bearings",
            highlight: ["bearing", "main-girder", "pier"],
          },
          caption: "The deck grows longer in summer heat, and it needs somewhere to go.",
        },
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
              visual: {
                kind: "scene",
                scene: "bearings",
                highlight: ["main-girder"],
                labels: true,
              },
            },
            {
              text: "If the deck were clamped down, those movements would tear the structure apart.",
              visual: {
                kind: "scene",
                scene: "bearings",
                highlight: ["main-girder", "pier-cap"],
                labels: true,
              },
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
            {
              text: "Follow the load downwards: girder, then what it rests on, then the pier.",
              visual: {
                kind: "scene",
                scene: "bearings",
                highlight: ["main-girder", "pier-cap", "pier"],
                labels: true,
              },
            },
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
              visual: {
                kind: "scene",
                scene: "bearings",
                highlight: ["main-girder", "bearing"],
                labels: true,
              },
            },
            {
              text: "A bearing that jams makes the real structure behave differently from that assumption — and that is how unexpected cracks appear.",
              visual: {
                kind: "scene",
                scene: "bearings",
                highlight: ["bearing", "pier-cap"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "piers-and-abutments": [
      {
        id: "piers-and-abutments",
        type: "heading",
        text: "Piers & Abutments",
        figure: {
          visual: {
            kind: "scene",
            scene: "supports",
            highlight: ["abutment", "pier"],
          },
          caption: "One stands in the middle, one stands at the end where the road comes onto the bridge.",
        },
      },
      {
        id: "piers-and-abutments-substructure",
        type: "paragraph",
        text: "Piers and abutments together are the substructure: the supporting structure that receives the deck's dead load and the live load of vehicles and people, and passes it to the foundation.",
        figure: {
          visual: {
            kind: "scene",
            scene: "overview",
            highlight: ["pier", "abutment"],
          },
          caption: "Piers and abutments look different and do exactly the same job.",
        },
      },
      {
        id: "abutment-at-each-end",
        type: "paragraph",
        text: "The support at each end of the bridge is an abutment. It connects to the road embankment and resists the horizontal earth pressure of the fill, so the bank cannot slide or collapse. A support in the middle of the span is a pier — and a single-span bridge has no pier at all.",
        figure: {
          visual: {
            kind: "scene",
            scene: "supports",
            highlight: ["abutment", "embankment"],
          },
          caption: "The road arrives on a bank of earth that would slump without something to hold it.",
        },
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
            {
              text: "Abutments are at the ends: they are what the road runs onto, and what holds the earth back.",
              visual: {
                kind: "scene",
                scene: "supports",
                highlight: ["abutment", "embankment"],
                labels: true,
              },
            },
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
            {
              text: "Look at the end the road arrives from. The fill behind it is pushing all the time.",
              visual: {
                kind: "scene",
                scene: "supports",
                highlight: ["embankment"],
                labels: true,
              },
            },
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
              visual: {
                kind: "scene",
                scene: "supports",
                highlight: ["embankment", "abutment"],
                labels: true,
              },
            },
            {
              text: "Stone cone-slope protection keeps the bank stable; the transition slab, resting on the fill, rotates as it settles.",
              visual: {
                kind: "scene",
                scene: "supports",
                highlight: ["cone-slope", "transition-slab", "embankment"],
                labels: true,
              },
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
      {
        id: "bridge-foundations",
        type: "heading",
        text: "Foundations",
        figure: {
          visual: {
            kind: "scene",
            scene: "foundations",
          },
          caption: "The deepest part decides how much the whole bridge can carry.",
        },
      },
      {
        id: "what-a-foundation-does",
        type: "paragraph",
        text: "The foundation is the bottom part of the piers and abutments that transfers all their loads into the ground. It is the key to a bridge being safe to use — and because it is often buried deep in soil, and sometimes built underwater, it is one of the most difficult parts of the whole job.",
        figure: {
          visual: {
            kind: "scene",
            scene: "foundations",
            highlight: ["pile", "bearing-stratum"],
          },
          caption: "Piles reach past soft ground until they find something firm enough to stand on.",
        },
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
              visual: {
                kind: "scene",
                scene: "foundations",
                highlight: ["pier", "bearing-stratum"],
                labels: true,
              },
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
            {
              text: "The pier stands in the air; the ground is far below.",
              visual: {
                kind: "scene",
                scene: "foundations",
                highlight: ["pier", "bearing-stratum"],
                labels: true,
              },
            },
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
            {
              text: "Above ground, work is open and visible. Below ground, it is neither.",
              visual: {
                kind: "scene",
                scene: "foundations",
                highlight: ["pier"],
                labels: true,
              },
            },
            {
              text: "Foundations are buried deep, and sometimes have to be built underwater — so they need special techniques.",
              visual: {
                kind: "scene",
                scene: "foundations",
                highlight: ["pile-cap", "pile"],
                labels: true,
              },
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
      {
        id: "fittings-and-facilities",
        type: "heading",
        text: "Fittings & Facilities",
        figure: {
          visual: {
            kind: "scene",
            scene: "fittings",
          },
          caption: "A bridge at night needs its own light, and rain needs somewhere to go.",
        },
      },
      {
        id: "structure-is-only-half",
        type: "paragraph",
        text: "The structure is only half of a bridge. The rest is what makes it usable: deck paving, drainage and waterproofing, railings or crash barriers, expansion joints, and lighting. Urban bridges also reserve ducts for pipelines crossing the bridge, and sometimes build revetments and diversion works as needed.",
        figure: {
          visual: {
            kind: "scene",
            scene: "fittings",
            highlight: ["paving", "drain", "expansion-joint", "lighting"],
          },
          caption: "Water left standing on a deck finds its way into the concrete eventually.",
        },
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
            {
              text: "A long deck changes length with the temperature, every single day.",
              visual: {
                kind: "scene",
                scene: "fittings",
                highlight: ["paving"],
                labels: true,
              },
            },
            {
              text: "The expansion joint is a gap that opens and closes with it — the yellow marks on the deck.",
              visual: {
                kind: "scene",
                scene: "fittings",
                highlight: ["expansion-joint", "paving"],
                labels: true,
              },
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
            {
              text: "The main function of these facilities is to improve how the bridge serves the people using it.",
              visual: {
                kind: "scene",
                scene: "fittings",
                highlight: ["lighting", "paving"],
                labels: true,
              },
            },
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
              visual: {
                kind: "scene",
                scene: "fittings",
                highlight: ["paving"],
                labels: true,
              },
            },
            {
              text: "So the deck is waterproofed and drained: water is collected and piped off the bridge.",
              visual: {
                kind: "scene",
                scene: "fittings",
                highlight: ["paving", "drain"],
                labels: true,
              },
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
      {
        id: "reading-the-drawing",
        type: "heading",
        text: "Reading the Drawing",
        figure: {
          visual: {
            kind: "scene",
            scene: "dimensions",
          },
          caption: "L, l and l₀ each measure a different part of the same bridge.",
        },
      },
      {
        id: "water-levels-explained",
        type: "paragraph",
        text: "The water level in a river changes constantly. The lowest level in the dry season is the low water level. The highest seen in flood season is the high water level. The level calculated for the flood the bridge is designed to pass is the design flood level. The level at which boats can still navigate normally is the navigable water level.",
        figure: {
          visual: {
            kind: "scene",
            scene: "levels",
            highlight: ["low-water-level", "high-water-level", "design-flood-level"],
          },
          caption: "A river that has never reached a line is still a river that might.",
        },
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
            {
              text: "Start from the river bed and work upwards.",
              visual: {
                kind: "scene",
                scene: "levels",
                highlight: ["low-water-level"],
                labels: true,
              },
            },
            {
              text: "Low water, then navigable, then the design flood, and at the top the highest flood ever seen.",
              visual: {
                kind: "scene",
                scene: "levels",
                highlight: ["low-water-level", "navigable-level", "design-flood-level", "high-water-level"],
                labels: true,
              },
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
            {
              text: "A boat does not need a level — it needs room.",
              visual: {
                kind: "scene",
                scene: "levels",
                highlight: ["navigable-level"],
                labels: true,
              },
            },
            {
              text: "The clearance is the space kept free under the bottom of the superstructure for navigation.",
              visual: {
                kind: "scene",
                scene: "levels",
                highlight: ["clearance", "navigable-level"],
                labels: true,
              },
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
            {
              text: "The net span l₀ is the clear opening — the waterway between two piers.",
              visual: {
                kind: "scene",
                scene: "dimensions",
                highlight: ["net-span"],
                labels: true,
              },
            },
            {
              text: "The computed span l is measured centre to centre of the supports.",
              visual: {
                kind: "scene",
                scene: "dimensions",
                highlight: ["computed-span"],
                labels: true,
              },
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
              visual: {
                kind: "scene",
                scene: "dimensions",
                highlight: ["net-span"],
                labels: true,
              },
            },
            {
              text: "Whatever is left between those two is the allowable construction height.",
              visual: {
                kind: "scene",
                scene: "dimensions",
                highlight: ["construction-height"],
                labels: true,
              },
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
      {
        id: "level-check-name-that-part",
        type: "heading",
        text: "Level Check: Name That Part",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["Name each part", "Read the drawing", "Use the numbers"],
          },
          caption: "Three questions worth asking yourself before the next module.",
        },
      },
      {
        id: "module-one-in-one-drawing",
        type: "paragraph",
        text: "Module 1 in one drawing. Everything you have learned is on this bridge — find it, name it, and read the numbers off it.",
        figure: {
          visual: {
            kind: "scene",
            scene: "overview",
            highlight: ["bearing", "abutment", "foundation"],
          },
          caption: "Point to the bearing, the abutment and the piles, and this module is done.",
        },
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
            {
              text: "Start with what carries the traffic, then what holds it up.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure"],
                labels: true,
              },
            },
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
            {
              text: "It is the smallest part on the drawing — and nothing gets past it.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure", "pier"],
                labels: true,
              },
            },
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
            {
              text: "The superstructure spans; the substructure supports; the fittings make it usable.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["superstructure", "pier", "abutment", "foundation"],
                labels: true,
              },
            },
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
            {
              text: "The net span is the clear opening of one span, measured at the design flood level.",
              visual: {
                kind: "scene",
                scene: "levels",
                highlight: ["design-flood-level"],
                labels: true,
              },
            },
            {
              text: "Add up all the net spans of a multi-span bridge and you have the total span Σl₀.",
              visual: {
                kind: "scene",
                scene: "levels",
                highlight: ["clearance"],
                labels: true,
              },
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
      {
        id: "six-ways-to-sort",
        type: "heading",
        text: "Six Ways to Sort",
        figure: {
          visual: {
            kind: "scene",
            scene: "composite",
          },
          caption: "The same span can be held up by an arch, by stays, or by a cable overhead.",
        },
      },
      {
        id: "why-engineers-sort-bridges",
        type: "paragraph",
        text: "We meet bridges every day: a small footbridge on the way to work, or a bridge that turns a journey into a view. To study them systematically, engineers sort them — and there is more than one way to sort the same bridge.",
        figure: {
          visual: {
            kind: "scene",
            scene: "deck-position",
          },
          caption: "One arch, three decks: the same structure sorted three different ways.",
        },
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
            {
              text: "The first five look at a bridge from the outside: what it is made of, what it is for, how far it reaches, where the traffic sits, what it crosses.",
              visual: {
                kind: "scene",
                scene: "overview",
                labels: true,
              },
            },
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
            {
              text: "Nature of crossing asks what the bridge goes over: a river, the sea, or another road.",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["span"],
                labels: true,
              },
            },
            {
              text: "River-crossing, cross-sea and overpass are the answers. A movable bridge is used when ships need the waterway itself.",
              visual: {
                kind: "scene",
                scene: "carries",
                highlight: ["waterway"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "by-material": [
      {
        id: "by-material",
        type: "heading",
        text: "By Material",
        figure: {
          visual: {
            kind: "scene",
            scene: "superstructure",
            highlight: ["deck-slab", "main-girder"],
          },
          caption: "Concrete in the slab and steel in the girder: the most common pairing of all.",
        },
      },
      {
        id: "most-widely-used-material",
        type: "paragraph",
        text: "The most widely used bridge material is reinforced concrete. Steel is used where light weight matters most. Beyond those come the high-performance materials: ultra-high performance concrete (UHPC) for the ribs of box arches, and carbon-fibre reinforced polymer (CFRP) cables in cable-stayed bridges.",
        figure: {
          visual: {
            kind: "scene",
            scene: "arch",
            highlight: ["arch-ring"],
          },
          caption: "An arch ring is where the newest, strongest concrete earns its place.",
        },
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
            {
              text: "Reinforced concrete is the workhorse: cheap, strong, and easy to shape.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["simply-supported"],
                labels: true,
              },
            },
            {
              text: "Steel is chosen when a lighter structure buys a longer span.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["main-girder"],
                labels: true,
              },
            },
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
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["main-girder", "stay-cable"],
                labels: true,
              },
            },
            {
              text: "Making the girder lighter lets more of that capacity carry traffic instead — so the span can grow.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["main-girder"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "by-purpose": [
      {
        id: "by-purpose",
        type: "heading",
        text: "By Purpose",
        figure: {
          visual: {
            kind: "scene",
            scene: "carries",
            highlight: ["roadway", "railway", "footpath"],
          },
          caption: "Whoever the bridge was built for, they all travel on the same slab.",
        },
      },
      {
        id: "groups-bridges-serve",
        type: "paragraph",
        text: "Bridges serve different groups of people: railway bridges, highway bridges, pedestrian bridges, road-rail bridges, and waterway bridges. Water crossing structures include aqueducts and inverted siphon bridges, and inside factories there are transport bridges and pipeline bridges.",
        figure: {
          visual: {
            kind: "scene",
            scene: "carries",
            highlight: ["railway", "footpath", "waterway"],
          },
          caption: "Boats need clearance underneath, and trains need a track that hardly bends.",
        },
      },
      {
        id: "crab-bridge-australia",
        type: "paragraph",
        text: "Not every bridge is for people. In Australia a bridge was built for wildlife: crabs making their yearly migration across a road. The principle behind it matters in bridge engineering — pay attention to environmental protection and ecological sustainability.",
        figure: {
          visual: {
            kind: "scene",
            scene: "supports",
            highlight: ["embankment", "cone-slope"],
          },
          caption: "A bridge can keep a road for people and leave the ground beside it for everything else.",
        },
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
            {
              text: "Purpose is about who or what needs to get across — and sometimes it is not people at all.",
              visual: {
                kind: "scene",
                scene: "carries",
                highlight: ["roadway", "footpath"],
                labels: true,
              },
            },
            {
              text: "Aqueducts carry water, pipeline bridges carry pipes, and some bridges exist purely for wildlife.",
              visual: {
                kind: "scene",
                scene: "carries",
                highlight: ["pipe-duct"],
                labels: true,
              },
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
            {
              text: "The bridge was built so that crabs could migrate safely, not to carry vehicles.",
              visual: {
                kind: "scene",
                scene: "carries",
                highlight: ["footpath"],
                labels: true,
              },
            },
            {
              text: "It is a reminder that protecting the environment belongs in the design principles, alongside strength and cost.",
              visual: {
                kind: "scene",
                scene: "carries",
                highlight: ["waterway"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "by-span": [
      {
        id: "by-span",
        type: "heading",
        text: "By Span",
        figure: {
          visual: {
            kind: "scene",
            scene: "beam",
          },
          caption: "One span, three supports, two arms reaching out: length decides which shape makes sense.",
        },
      },
      {
        id: "small-medium-large-spans",
        type: "paragraph",
        text: "Design specifications classify bridges by total length and by single span: small, medium, large and extra-large. Span is also the number that decides which structural system makes sense — beam, arch, cable-stayed or suspension.",
        figure: {
          visual: {
            kind: "scene",
            scene: "dimensions",
            highlight: ["net-span", "computed-span"],
          },
          caption: "Span is measured from support to support, never from one bank to the other.",
        },
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
            {
              text: "Up to about 600 m an arch can be the reasonable economic choice, and cable-stayed bridges now reach beyond 1100 m.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring"],
                labels: true,
              },
            },
            {
              text: "But once the main span passes about 1000 m, a suspension bridge is generally considered the most economical type.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["stay-cable"],
                labels: true,
              },
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
            {
              text: "Standard spans for concrete beam bridges are mostly under 30 m.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["simply-supported"],
                labels: true,
              },
            },
            {
              text: "As the span grows, prestressed concrete continuous beams or continuous rigid frames take over — like the 330 m main span of the Shibanpo Yangtze River Bridge.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["continuous-frame"],
                labels: true,
              },
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
      {
        id: "where-the-deck-sits",
        type: "heading",
        text: "Where the Deck Sits",
        figure: {
          visual: {
            kind: "scene",
            scene: "deck-position",
          },
          caption: "Traffic can ride on the structure, inside it, or halfway between.",
        },
      },
      {
        id: "three-deck-positions",
        type: "paragraph",
        text: "Classified by the relative position of the bridge deck and the main load-bearing structure, bridges come in three kinds: the deck (or upper-support) bridge, where traffic runs on top; the through (or bottom-support) bridge, where traffic runs inside the structure; and the half-through (or middle-support) bridge, where the deck cuts across the middle.",
        figure: {
          visual: {
            kind: "scene",
            scene: "deck-position",
            highlight: ["through-bridge", "half-through-bridge"],
          },
          caption: "Where the deck sits decides what a driver sees beside the road.",
        },
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
            {
              text: "Read each drawing from the traffic's point of view.",
              visual: {
                kind: "scene",
                scene: "deck-position",
                labels: true,
              },
            },
            {
              text: "On the top drawing the structure is entirely below; on the second, entirely above.",
              visual: {
                kind: "scene",
                scene: "deck-position",
                highlight: ["deck-bridge", "through-bridge"],
                labels: true,
              },
            },
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
              visual: {
                kind: "scene",
                scene: "deck-position",
                highlight: ["through-bridge"],
                labels: true,
              },
            },
            {
              text: "It also keeps the construction height under the deck small — which is exactly what the allowable construction height demands.",
              visual: {
                kind: "scene",
                scene: "dimensions",
                highlight: ["construction-height"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "beam-bridges": [
      {
        id: "beam-bridges",
        type: "heading",
        text: "Beam Bridges",
        figure: {
          visual: {
            kind: "scene",
            scene: "beam",
          },
          caption: "A beam does nothing clever: it rests on its supports and bends.",
        },
      },
      {
        id: "simplest-bridge-of-all",
        type: "paragraph",
        text: "A beam laid on a pier gives the simplest bridge of all: the simply supported beam bridge. Under a vertical load, a beam's supports produce only vertical reactions — no horizontal force — and the main beam is primarily in bending. That is why beam bridges are built from materials that resist bending well, such as steel and reinforced concrete.",
        figure: {
          visual: {
            kind: "scene",
            scene: "beam",
            highlight: ["simply-supported"],
          },
          caption: "Load a beam in the middle and it sags; that sag is what bending means.",
        },
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
            {
              text: "A simply supported span is the simplest to analyse and build, which is why short spans use it.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["simply-supported"],
                labels: true,
              },
            },
            {
              text: "A continuous girder ties the spans together at the piers: the spans help each other, and the ride is smoother.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["continuous"],
                labels: true,
              },
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
            {
              text: "Look for the drawing with two separate pieces meeting in the middle.",
              visual: {
                kind: "scene",
                scene: "beam",
                labels: true,
              },
            },
            {
              text: "The cantilever ends carry a hanging span between them, and the connection there needs a complex detail.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["cantilever"],
                labels: true,
              },
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
            {
              text: "No horizontal reaction means no arch-like thrust: the beam simply bends.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["simply-supported"],
                labels: true,
              },
            },
            {
              text: "So the material must be strong in bending — steel, reinforced concrete, or prestressed concrete.",
              visual: {
                kind: "scene",
                scene: "superstructure",
                highlight: ["main-girder"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "arch-bridges": [
      {
        id: "arch-bridges",
        type: "heading",
        text: "Arch Bridges",
        figure: {
          visual: {
            kind: "scene",
            scene: "arch",
            highlight: ["arch-ring"],
          },
          caption: "An arch carries its load by squeezing, not by bending.",
        },
      },
      {
        id: "main-arch-ring",
        type: "paragraph",
        text: "The main load-bearing member of an arch bridge is the main arch ring. Under a vertical load there is a horizontal thrust at the arch foot — and the bending moment that thrust creates has the opposite sign to the one the vertical load creates. The two cancel out, so the arch ring has small bending moments and shear, and is mainly in compression.",
        figure: {
          visual: {
            kind: "scene",
            scene: "arch",
            highlight: ["arch-ring", "thrust", "tie-rod"],
          },
          caption: "Tie the two feet together and the ground no longer has to take the push.",
        },
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
            {
              text: "An arch works in compression, so its feet push outwards as the load comes down.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring"],
                labels: true,
              },
            },
            {
              text: "That push is the horizontal thrust, and it is what the foundation of a through-arch bridge must be able to take.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring", "thrust"],
                labels: true,
              },
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
            {
              text: "The tie pulls the two arch feet towards each other — exactly the opposite of what the thrust does.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["tie-rod", "thrust"],
                labels: true,
              },
            },
            {
              text: "With the thrust balanced inside the bridge, the foundation no longer has to be big enough to resist it.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring", "tie-rod"],
                labels: true,
              },
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
            {
              text: "In an arch, the thrust cancels most of the bending: the ring is mainly in compression.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring", "thrust"],
                labels: true,
              },
            },
            {
              text: "With small bending, shear and deformation, the arch has a great spanning capacity — the arches now under construction exceed 600 m.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring"],
                labels: true,
              },
            },
            {
              text: "Where the ground allows it, an arch is often the economically reasonable choice — and its curve is beautiful.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring"],
                labels: false,
              },
            },
          ],
        },
      },
    ],

    "rigid-frames": [
      {
        id: "rigid-frames",
        type: "heading",
        text: "Rigid Frames",
        figure: {
          visual: {
            kind: "scene",
            scene: "frame",
          },
          caption: "Three frames, one idea: the joint where the leg meets the beam is never free to move.",
        },
      },
      {
        id: "beam-and-piers-combined",
        type: "paragraph",
        text: "A rigid frame bridge is one where the beam and the piers are integrally combined. The piers are fixed to the beam, so they take part in the beam's bending — which improves the bridge's resistance to bending, and lets the structure be shallower.",
        figure: {
          visual: {
            kind: "scene",
            scene: "frame",
            highlight: ["rigid-joint", "portal-frame"],
          },
          caption: "A rigid joint is stiff and strong, and it pulls hard on the concrete at the corner.",
        },
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
            {
              text: "The biggest difference from a beam bridge is how the pier and the beam are connected.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["portal-frame"],
                labels: true,
              },
            },
            {
              text: "In a beam bridge the deck rests on bearings. In a rigid frame the pier and beam are fixed together at a rigid joint.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["rigid-joint"],
                labels: true,
              },
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
            {
              text: "Where the pier and beam meet, the structure is very stiff.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["portal-frame"],
                labels: true,
              },
            },
            {
              text: "That attracts a large negative bending moment, and ordinary reinforced concrete cracks under it.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["rigid-joint", "portal-frame"],
                labels: true,
              },
            },
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
            {
              text: "A continuous frame is multiply statically indeterminate: temperature and settlement make it develop secondary internal forces.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["continuous-frame", "rigid-joint"],
                labels: true,
              },
            },
            {
              text: "Making the piers slender and flexible softens that effect — giving the high-pier, long-span continuous rigid frame used in mountain valleys.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["continuous-frame"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "cable-stayed": [
      {
        id: "cable-stayed-bridges",
        type: "heading",
        text: "Cable-Stayed Bridges",
        figure: {
          visual: {
            kind: "scene",
            scene: "cable-stayed",
          },
          caption: "Every stay is steel in tension, and the tower takes the pushing.",
        },
      },
      {
        id: "three-main-parts",
        type: "paragraph",
        text: "A cable-stayed bridge has three main parts: the stay cables, the main girder, and the tower. Without the stays, the girder would behave like a three-span continuous beam under the traffic load. Add the towers and cables, and everything changes.",
        figure: {
          visual: {
            kind: "scene",
            scene: "cable-stayed",
            highlight: ["stay-cable", "main-girder", "tower"],
          },
          caption: "Each stay lifts at one point, so the girder never has to span a whole bay alone.",
        },
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
            {
              text: "Follow the load from the girder upwards.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["main-girder"],
                labels: true,
              },
            },
            {
              text: "The vertical component of each stay cable gives the girder a multi-point, vertical, elastic support.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["elastic-support"],
                labels: true,
              },
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
            {
              text: "As the span grows, the cables get longer and heavier.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["stay-cable"],
                labels: true,
              },
            },
            {
              text: "Their own weight makes them sag, and a sagging cable is a less stiff cable.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["stay-cable", "main-girder"],
                labels: true,
              },
            },
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
            {
              text: "The cables carry tension; the tower takes the vertical components downwards as compression.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["stay-cable", "tower"],
                labels: true,
              },
            },
            {
              text: "The horizontal components of the stays push the girder towards the tower, so the girder is a compression-and-bending member.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["main-girder"],
                labels: true,
              },
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
            {
              text: "Stay cables are thin, highly stressed, and out in the weather.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["stay-cable"],
                labels: true,
              },
            },
            {
              text: "Corrosion and fatigue are the two defects that must be treated carefully — which is also why CFRP cables are being tried, despite their cost and anchoring difficulty.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["stay-cable", "anchor"],
                labels: true,
              },
            },
          ],
        },
      },
    ],

    "suspension-and-composite": [
      {
        id: "suspension-and-combined-systems",
        type: "heading",
        text: "Suspension & Combined Systems",
        figure: {
          visual: {
            kind: "scene",
            scene: "suspension",
          },
          caption: "The longest spans in the world hang from wire thinner than a person's arm.",
        },
      },
      {
        id: "hangs-the-whole-span",
        type: "paragraph",
        text: "A suspension bridge hangs the whole span from a strong cable carried over the towers. The cable is the main load-bearing member. Hangers drop from it to lift the deck structure — in a suspension bridge the deck is called the stiffening girder — and the ends of the cable are anchored in massive blocks called anchorages.",
        figure: {
          visual: {
            kind: "scene",
            scene: "suspension",
            highlight: ["main-cable", "hanger", "stiffening-girder"],
          },
          caption: "Push down on a suspension deck and the whole cable changes shape to resist it.",
        },
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
            {
              text: "The main cable is in tension, so its ends are pulling hard inwards.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["main-cable"],
                labels: true,
              },
            },
            {
              text: "Those ends are tied down into huge anchorage blocks at each end of the bridge.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["anchorage", "main-cable"],
                labels: true,
              },
            },
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
            {
              text: "Hangers support the stiffening girder at many points, so its bending is small — that is why the system spans so far.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["hanger"],
                labels: true,
              },
            },
            {
              text: "But the same lightness means low stiffness: the structure moves under wind.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["stiffening-girder"],
                labels: true,
              },
            },
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
            {
              text: "In a cable-stayed bridge the stays are straight and go directly to the girder: the system is stiff.",
              visual: {
                kind: "scene",
                scene: "cable-stayed",
                highlight: ["stay-cable"],
                labels: true,
              },
            },
            {
              text: "In a suspension bridge one cable sags across the span and hangers lift the deck from it.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["main-cable", "hanger"],
                labels: true,
              },
            },
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
            {
              text: "A beam and an arch can carry a load together, each doing what it does best.",
              visual: {
                kind: "scene",
                scene: "composite",
                highlight: ["beam-arch"],
                labels: true,
              },
            },
            {
              text: "A beam bridge can be given a few stays to take some of its bending.",
              visual: {
                kind: "scene",
                scene: "composite",
                highlight: ["partial-cable-stayed"],
                labels: true,
              },
            },
            {
              text: "A cable-stayed bridge and a suspension bridge can be combined so the stays stiffen the ends while the suspended cable spans the middle.",
              visual: {
                kind: "scene",
                scene: "composite",
                highlight: ["cable-suspension"],
                labels: true,
              },
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
      {
        id: "level-check-match-system",
        type: "heading",
        text: "Level Check: Match the System",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["Name the system", "Check the span", "Pick the shape"],
          },
          caption: "Five systems, and every bridge you meet is one of them.",
        },
      },
      {
        id: "five-structural-systems",
        type: "paragraph",
        text: "Every bridge in this module is one of five structural systems, plus the composites that mix them. Here is the whole module in one set of questions.",
        figure: {
          visual: {
            kind: "scene",
            scene: "composite",
            highlight: ["beam-arch", "partial-cable-stayed", "cable-suspension"],
          },
          caption: "Most long bridges borrow from two systems rather than choosing one.",
        },
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
            {
              text: "Look for the drawing with a curve in it.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring"],
                labels: true,
              },
            },
            {
              text: "An arch ring works mainly in compression, and the horizontal thrust at its feet cancels most of the bending from the load.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring", "thrust"],
                labels: true,
              },
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
            {
              text: "Start with the span: short spans bend, medium spans can arch, and only cable systems reach the very long spans.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["simply-supported"],
                labels: true,
              },
            },
            {
              text: "Pingnan Third and Chaotianmen are arches; Yangsigang and Zhanggao are suspension bridges; Shibanpo is a continuous rigid frame.",
              visual: {
                kind: "scene",
                scene: "arch",
                highlight: ["arch-ring"],
                labels: true,
              },
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
            {
              text: "Think about how each system carries its load, and how much bending is left in the girder.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["simply-supported", "continuous", "cantilever"],
                labels: true,
              },
            },
            {
              text: "Beam, then rigid frame and arch, then cable-stayed, then suspension.",
              visual: {
                kind: "scene",
                scene: "suspension",
                highlight: ["stiffening-girder", "main-cable"],
                labels: true,
              },
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
            {
              text: "Every classification in this module leads to the same question: what does this span need?",
              visual: {
                kind: "scene",
                scene: "overview",
                highlight: ["span"],
                labels: true,
              },
            },
            {
              text: "At 20 m, a beam or a small arch is simple, cheap and appropriate — great spanning capacity is not needed.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["simply-supported"],
                labels: true,
              },
            },
            {
              text: "Where conditions permit, building an arch is often an economically reasonable choice — and for a short span, so is a beam.",
              visual: {
                kind: "diagram",
                name: "level-check",
                labels: ["Read the span", "Check the ground", "Choose the system"],
              },
            },
          ],
        },
      },
    ],
  },

  // ── Module 3 · Deck Layout & Construction ────────────────────────────────
  "deck-layout-and-construction": {
    "deck-in-plan": [
      {
        id: "the-deck-in-plan",
        type: "heading",
        text: "The Deck in Plan",
        figure: {
          visual: { kind: "scene", scene: "deck-layout" },
          caption: "Everything a deck carries, seen in plan: road, walkways, kerbs and the fittings along the edges.",
        },
      },
      {
        id: "what-the-deck-is-for",
        type: "paragraph",
        text: "The deck is the part of a bridge everybody meets and nobody notices. It is exposed to the weather, it is in direct contact with the traffic and the pedestrians, and its first job is to protect the main structure underneath it. So a deck is not one surface: it is a small system of layers, edges and fittings, each with its own job.",
        figure: {
          visual: {
            kind: "scene",
            scene: "deck-layout",
            highlight: ["carriageway", "footway"],
          },
          caption: "Vehicles run on the carriageway; pedestrians walk on the raised footways beside it.",
        },
      },
      {
        id: "deck-construction-includes",
        type: "list",
        items: [
          "Bridge deck pavement — also called the roadway pavement, or the deck protective layer: the part the wheels touch.",
          "A waterproofing and drainage system, which keeps rainwater out of the structure and off the road.",
          "Expansion joints, the gaps that let a span grow and shrink without cracking.",
          "Footways and safety belts, whose width follows the number of pedestrians.",
          "Kerbs, railings, guardrails and lighting columns — the fittings that turn a structure into a road.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "fittings",
            highlight: ["paving", "drain", "expansion-joint", "railing", "lighting"],
          },
          caption: "The same fittings, seen from the side of the bridge.",
        },
      },
      {
        id: "tour-the-deck-plan",
        type: "parts",
        prompt: "Take the tour: tap each pin on the plan.",
        scene: "deck-layout",
        hint: "Seven pins: two surfaces, an edge, a joint, a grate and a lamp.",
      },
      {
        id: "raised-walkway",
        type: "hotspot",
        prompt: "Tap the raised walkway that keeps pedestrians off the carriageway.",
        scene: "deck-layout",
        parts: ["carriageway", "footway", "kerb", "railing"],
        answer: "footway",
        explanation: {
          steps: [
            {
              text: "Look for a strip along the edge of the deck, narrower than the road.",
              visual: { kind: "scene", scene: "deck-layout", labels: true },
            },
            {
              text: "A footway stands a step above the carriageway, and the kerb is the low wall that makes the step.",
              visual: {
                kind: "scene",
                scene: "deck-layout",
                highlight: ["footway", "kerb"],
                labels: true,
              },
            },
            {
              text: "The step is there for two reasons: it protects the people walking, and it lets the deck fall towards the road.",
              visual: {
                kind: "scene",
                scene: "deck-layout",
                highlight: ["footway"],
                labels: true,
                caption: "The footway: a raised walkway along the edge of the deck.",
              },
            },
          ],
        },
      },
      {
        id: "not-part-of-the-deck-layout",
        type: "choose",
        prompt: "A deck layout is everything above the main structure. Which of these is NOT part of it?",
        choices: [
          "The pavement and the waterproof layer",
          "The expansion joints between the spans",
          "The piles buried under the pier",
          "The railings and the lighting columns",
        ],
        answer: 2,
        explanation: {
          steps: [
            {
              text: "Everything on a bridge belongs either to the superstructure or to the supports — and the deck equipment all belongs above the supports.",
              visual: { kind: "scene", scene: "deck-layout", labels: true },
            },
            {
              text: "Piles are the buried part of a foundation: they carry the load into the ground, far below the deck.",
              visual: {
                kind: "scene",
                scene: "foundations",
                highlight: ["pile"],
                labels: true,
              },
            },
            {
              text: "The pavement, the joints, the railings and the lighting are all on the deck, and a driver meets every one of them.",
              visual: {
                kind: "scene",
                scene: "deck-layout",
                highlight: ["carriageway", "expansion-joint", "railing"],
                labels: true,
              },
            },
          ],
        },
      },
      {
        id: "sort-the-deck-by-its-job",
        type: "sort",
        prompt: "Sort each part of the deck by the user it serves.",
        buckets: [
          { id: "traffic", label: "For the traffic" },
          { id: "pedestrians", label: "For the pedestrians" },
          { id: "rainwater", label: "For the rainwater" },
        ],
        items: [
          { id: "carriageway", label: "The carriageway", bucket: "traffic" },
          { id: "lamp", label: "The lighting column", bucket: "traffic" },
          { id: "footway", label: "The raised footway", bucket: "pedestrians" },
          { id: "railing", label: "The railing along the edge", bucket: "pedestrians" },
          { id: "drain", label: "The grated inlet at the kerb", bucket: "rainwater" },
          { id: "fall", label: "The fall built across the deck", bucket: "rainwater" },
        ],
        explanation: {
          steps: [
            {
              text: "The carriageway is sized by traffic and the lamp lights it; the footway and its railing belong to the pedestrians.",
              visual: {
                kind: "scene",
                scene: "deck-layout",
                highlight: ["carriageway", "footway"],
                labels: true,
              },
            },
            {
              text: "Rainwater is handled by two things working together: the fall that moves it, and the inlet that takes it off the surface.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["cross-slope", "kerb-inlet"],
                labels: true,
                caption: "A fall and an inlet: the smallest drainage system there is.",
              },
            },
          ],
        },
      },
    ],
    "deck-pavement": [
      {
        id: "deck-pavement",
        type: "heading",
        text: "Deck Pavement",
        figure: {
          visual: { kind: "scene", scene: "pavement" },
          caption: "A deck in section: the surface traffic touches, the sheet under it, the slab, and the mesh inside the slab.",
        },
      },
      {
        id: "what-pavement-does",
        type: "paragraph",
        text: "Bridge deck pavement is the layer directly under the wheels. It protects the main structure in three ways at once: it stops the tyres wearing the roadway slab itself, it stops rainwater eroding the main beam, and it spreads each concentrated wheel load out before the slab has to carry it. It also has to meet the layout and appearance of the bridge, which is why the surface is designed rather than merely laid.",
        figure: {
          visual: { kind: "scene", scene: "pavement", highlight: ["wearing-course"] },
          caption: "The wearing course takes the wear so that the structure underneath never has to.",
        },
      },
      {
        id: "what-a-pavement-must-be",
        type: "list",
        items: [
          "Rutting-resistant, so the wheel tracks do not sink into it.",
          "Comfortable to drive on, and skid-resistant when it is wet.",
          "Wear-resistant, because it is the part traffic consumes.",
          "Resistant to cracking at low temperature.",
          "Impermeable, so water cannot pass through it.",
          "Stiff enough to spread the wheel loads into the slab.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "pavement",
            highlight: ["wearing-course", "waterproof-layer"],
          },
          caption: "One layer takes the wear; the layer under it makes sure nothing seeps past.",
        },
      },
      {
        id: "name-the-pavement-layers",
        type: "parts",
        prompt: "Tap each pin to name a layer of the deck pavement.",
        scene: "pavement",
        hint: "Four pins, from the surface down into the slab.",
      },
      {
        id: "layer-that-keeps-water-out",
        type: "hotspot",
        prompt: "Tap the layer whose whole job is to keep water out of the concrete.",
        scene: "pavement",
        parts: ["wearing-course", "waterproof-layer", "deck-slab", "steel-mesh"],
        answer: "waterproof-layer",
        explanation: {
          steps: [
            {
              text: "The wheels meet the top layer first, and the wheel loads end up in the bottom one.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["wearing-course", "deck-slab"],
                labels: true,
              },
            },
            {
              text: "Between them lies a sheet that carries no load at all: it is there to intercept water on its way down.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["waterproof-layer"],
                labels: true,
              },
            },
            {
              text: "That sheet is the waterproof layer, and it sits between the cast-in-place concrete and the asphalt above it.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["waterproof-layer"],
                labels: true,
                caption: "The waterproof layer: no load, and the reason the slab stays dry.",
              },
            },
          ],
        },
      },
      {
        id: "concrete-pavement-minimum",
        type: "choose",
        prompt: "The General Specification sets two minimums for a cement concrete deck pavement. Which pair is right?",
        choices: [
          "At least 80 mm thick, in concrete of grade C40 or better",
          "At least 40 mm thick, in concrete of grade C20 or better",
          "At least 120 mm thick, in concrete of grade C60 or better",
          "At least 50 mm thick, in concrete of grade C25 or better",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "A deck pavement is not a footpath: it takes wheel loads, freeze-thaw cycles and de-icing salt in the same year.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["wearing-course"],
                labels: true,
              },
            },
            {
              text: "The specification therefore asks for a dense pavement at least 80 mm deep and concrete of grade C40 or better.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["deck-slab", "steel-mesh"],
                labels: true,
              },
            },
            {
              text: "A cement concrete pavement follows the cement concrete pavement specification, and an asphalt one follows the asphalt specification — two different documents, one deck.",
              visual: {
                kind: "scene",
                scene: "pavement",
                labels: true,
                caption: "Whichever surface is chosen, the layer under it is always the waterproofing.",
              },
            },
          ],
        },
      },
      {
        id: "mesh-inside-the-pavement",
        type: "choose",
        prompt: "Steel mesh goes inside a cement concrete deck pavement. Which specification is right?",
        choices: [
          "Bars of 8 mm or more, spaced no further apart than 100 mm",
          "Bars of 4 mm, spaced at 200 mm",
          "Bars of 12 mm, spaced at 250 mm",
          "No mesh at all — the concrete carries the tension itself",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "Concrete cracks when it is pulled, and a pavement on a bridge is pulled constantly by the deck moving under it.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["steel-mesh"],
                labels: true,
              },
            },
            {
              text: "The mesh holds those cracks closed, so the specification asks for bars of at least 8 mm at no more than 100 mm centres.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["steel-mesh", "deck-slab"],
                labels: true,
                caption: "Mesh inside the pavement: it keeps the cracks small and evenly spread.",
              },
            },
          ],
        },
      },
      {
        id: "two-ways-to-pave",
        type: "sort",
        prompt: "Sort each statement into the paving method it belongs to.",
        buckets: [
          { id: "asphalt", label: "Asphalt over a waterproof layer" },
          { id: "concrete", label: "Waterproof concrete" },
        ],
        items: [
          {
            id: "critical",
            label: "Used where waterproofing is critical, or where the deck is in the tension zone and may crack",
            bucket: "asphalt",
          },
          {
            id: "membrane",
            label: "A flexible adhesive or coating waterproof layer goes between the concrete and the asphalt",
            bucket: "asphalt",
          },
          {
            id: "eighty",
            label: "At least 80 mm of watertight concrete laid straight on the deck",
            bucket: "concrete",
          },
          {
            id: "grade",
            label: "Its grade is no lower than the concrete of the deck itself",
            bucket: "concrete",
          },
          {
            id: "renewable",
            label: "A 20 to 30 mm asphalt surface treatment is added on top as a layer that can be renewed",
            bucket: "concrete",
          },
        ],
        explanation: {
          steps: [
            {
              text: "The first method trusts a sheet; the second trusts the concrete itself to be watertight.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["waterproof-layer"],
                labels: true,
              },
            },
            {
              text: "Where the deck can crack, or where water would be disastrous, the layer of asphalt over a waterproof membrane is used.",
              visual: {
                kind: "scene",
                scene: "waterproofing",
                highlight: ["waterproof-layer", "wearing-course"],
                labels: true,
              },
            },
            {
              text: "In a region that never freezes, 80 mm of waterproof concrete can simply be laid on the deck, with a thin asphalt surface treatment on top to take the wear.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["wearing-course", "deck-slab"],
                labels: true,
                caption: "Waterproof concrete with a renewable surface treatment above it.",
              },
            },
          ],
        },
      },
      {
        id: "order-the-layers",
        type: "order",
        prompt: "Order these from the surface the tyres touch down to the member that spans.",
        items: [
          { id: "wearing", label: "The wearing course, which the tyres run on" },
          { id: "waterproof", label: "The waterproof layer, laid on the slab" },
          { id: "slab", label: "The deck slab, which spreads the wheel loads" },
          { id: "girder", label: "The main girder, which spans between the supports and bends" },
        ],
        explanation: {
          steps: [
            {
              text: "A wheel load arrives at the top of the deck, and every layer below it does one job before passing the load on.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["wearing-course", "waterproof-layer"],
                labels: true,
              },
            },
            {
              text: "The slab spreads the load across the width, and the girder carries it to the bearings as bending.",
              visual: {
                kind: "scene",
                scene: "superstructure",
                highlight: ["deck-slab", "main-girder"],
                labels: true,
              },
            },
          ],
        },
      },
    ],
    waterproofing: [
      {
        id: "waterproofing",
        type: "heading",
        text: "Waterproofing",
        figure: {
          visual: { kind: "scene", scene: "waterproofing" },
          caption: "The waterproof layer runs under the pavement, turns up at the kerb, and hands the water to a drain.",
        },
      },
      {
        id: "what-waterproofing-does",
        type: "paragraph",
        text: "Waterproofing exists because concrete is porous and steel rusts. Rainwater that soaks through the paving is intercepted by a waterproof layer, collected, and passed into the drainage system, so that it never reaches the structural concrete or the reinforcement inside it. The layer is laid under the deck pavement, and it has to be continuous: water is very good at finding the one place where it stops.",
        figure: {
          visual: { kind: "scene", scene: "waterproofing", highlight: ["waterproof-layer"] },
          caption: "One unbroken sheet, from the low edge of the pavement to the top of the kerb.",
        },
      },
      {
        id: "slope-does-the-work",
        type: "list",
        items: [
          "The deck needs enough longitudinal and transverse slope for rainwater to run off quickly.",
          "That fall is what prevents — or at least reduces — water soaking into the pavement layer.",
          "Protecting the roadway slab this way is one of the cheapest ways to extend a bridge's life.",
          "The transverse drainage slope of a bridge deck is made to match the transverse slope of the road.",
          "Where a footway is provided, its cross slope runs at 0.5 % to 1.5 % towards the roadway, so that it sheds onto the road and not over the edge.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "waterproofing",
            highlight: ["wearing-course", "kerb"],
          },
          caption: "The fall is what moves the water; the waterproof layer only stops it going down.",
        },
      },
      {
        id: "two-kinds-of-layer",
        type: "concepts",
        prompt: "Two things are called a waterproof layer on a bridge. Page through them.",
        concepts: [
          {
            id: "coating",
            label: "A waterproof coating",
            summary:
              "A flexible adhesive or coating applied to the concrete itself: it seals the surface the water is standing on.",
            scene: "waterproofing",
            highlight: ["waterproof-layer", "deck-slab"],
          },
          {
            id: "membrane",
            label: "A waterproof membrane",
            summary:
              "An asphalt or modified asphalt sheet laid in lapped strips, so that no two joints ever line up.",
            scene: "pavement",
            highlight: ["waterproof-layer"],
          },
        ],
      },
      {
        id: "tour-the-waterproofing",
        type: "parts",
        prompt: "Tap each pin: where the waterproofing runs, and what it protects.",
        scene: "waterproofing",
        hint: "Six pins, from the wearing course down to the pipe inside the deck.",
      },
      {
        id: "the-layer-that-intercepts-water",
        type: "hotspot",
        prompt: "Tap the layer that stops rainwater reaching the concrete.",
        scene: "waterproofing",
        parts: ["wearing-course", "waterproof-layer", "deck-slab", "kerb", "drain"],
        answer: "waterproof-layer",
        explanation: {
          steps: [
            {
              text: "Follow the water down: the wearing course lets it through, and the slab below must never see it.",
              visual: {
                kind: "scene",
                scene: "waterproofing",
                highlight: ["wearing-course", "deck-slab"],
                labels: true,
              },
            },
            {
              text: "Between the two sits a thin sheet, turned up at the kerb and joined to the drain.",
              visual: {
                kind: "scene",
                scene: "waterproofing",
                highlight: ["waterproof-layer", "kerb", "drain"],
                labels: true,
              },
            },
            {
              text: "That sheet is the waterproof layer: it carries no load, and it is the only thing keeping the reinforcement dry.",
              visual: {
                kind: "scene",
                scene: "waterproofing",
                highlight: ["waterproof-layer"],
                labels: true,
                caption: "The waterproof layer, turning up at the kerb so the water cannot walk round it.",
              },
            },
          ],
        },
      },
      {
        id: "where-the-layer-goes",
        type: "choose",
        prompt: "Where is the waterproof layer of a bridge deck placed?",
        choices: [
          "Under the deck pavement, on top of the structural concrete",
          "On top of the asphalt, so the rain runs off the surface",
          "Inside the slab, between the reinforcing bars",
          "Under the bridge, on the soffit of the girder",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "The layer has to be above the concrete it protects, and below everything traffic wears away.",
              visual: {
                kind: "scene",
                scene: "pavement",
                highlight: ["wearing-course", "waterproof-layer"],
                labels: true,
              },
            },
            {
              text: "That puts it directly under the pavement, laid on the cast-in-place concrete of the slab.",
              visual: {
                kind: "scene",
                scene: "waterproofing",
                highlight: ["waterproof-layer", "deck-slab"],
                labels: true,
                caption: "Under the pavement, on the slab: the only position that works.",
              },
            },
          ],
        },
      },
      {
        id: "path-of-a-raindrop",
        type: "order",
        prompt: "Order the path a drop of rainwater takes once it lands on the deck.",
        items: [
          { id: "lands", label: "It lands on the deck pavement" },
          { id: "seeps", label: "It seeps through the paving layer" },
          { id: "caught", label: "The waterproof layer catches it" },
          { id: "kerb", label: "It runs down the fall to the inlet at the kerb" },
          { id: "away", label: "The drain pipe carries it clear of the structure" },
        ],
        explanation: {
          steps: [
            {
              text: "Waterproofing and drainage are one system: the layer collects, the fall and the pipes remove.",
              visual: {
                kind: "scene",
                scene: "waterproofing",
                highlight: ["waterproof-layer"],
                labels: true,
              },
            },
            {
              text: "If either half fails, the other is wasted — a perfect sheet with nowhere to drain simply holds a puddle against the concrete.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["kerb-inlet", "downpipe"],
                labels: true,
              },
            },
          ],
        },
      },
    ],
    drainage: [
      {
        id: "drainage",
        type: "heading",
        text: "Drainage",
        figure: {
          visual: { kind: "scene", scene: "drainage" },
          caption: "Fall, inlet, trough and downpipe: the four things every deck drainage system is made of.",
        },
      },
      {
        id: "what-drainage-does",
        type: "paragraph",
        text: "The waterproofing and drainage system has two jobs: to stop water reaching the structure, so that the bridge keeps its durability, and to take the water off the road surface, so that traffic stays safe. Waterproofing is done with a layer. Drainage is done with the longitudinal and transverse slopes of the deck, working with a certain number of inlets, drains and pipes.",
        figure: {
          visual: {
            kind: "scene",
            scene: "drainage",
            highlight: ["cross-slope", "kerb-inlet"],
          },
          caption: "The fall brings the water to the inlet, and the pipe takes it from there.",
        },
      },
      {
        id: "drainage-numbers",
        type: "list",
        items: [
          "The drainage system has to suit the bridge structure and the drainage conditions under it; on large and extra-large bridges it is coordinated with the deck pavement design.",
          "Where the longitudinal slope of the deck is under 0.5 %, a longitudinal drainage trough is laid along the low edge of the pavement.",
          "A longitudinal drain or trough falls at not less than 0.5 %.",
          "A trough is aluminium, steel or glass fibre, rectangular or U-shaped, and neither its width nor its depth is less than 20 cm.",
          "A drainpipe may be cast iron, PVC, polyethylene, glass fibre or steel, and its inside diameter is never smaller than the downpipe it serves.",
          "Rainwater flows into the drainholes through inlets built into the kerb or the footway edge, and is discharged into the ground drainage or the river.",
        ],
        figure: {
          visual: { kind: "scene", scene: "drainage", highlight: ["drain", "downpipe"] },
          caption: "Every one of those numbers exists to stop water standing anywhere on the deck.",
        },
      },
      {
        id: "tour-the-drainage",
        type: "parts",
        prompt: "Tap each pin, and follow the water off the bridge.",
        scene: "drainage",
        hint: "Six pins: the road, the fall, the inlet, the trough, the pipe and the pier it hangs on.",
      },
      {
        id: "water-down-the-pier",
        type: "hotspot",
        prompt: "Tap the part that carries the water down the pier.",
        scene: "drainage",
        parts: ["roadway", "cross-slope", "kerb-inlet", "drain", "downpipe", "pier"],
        answer: "downpipe",
        explanation: {
          steps: [
            {
              text: "Water first has to leave the surface, so look past the fall and the inlet.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["cross-slope", "kerb-inlet"],
                labels: true,
              },
            },
            {
              text: "The trough then runs it along the deck to the lowest point, which is usually at a pier.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["drain"],
                labels: true,
              },
            },
            {
              text: "From there a vertical pipe fixed to the pier takes it to the ground: that pipe is the downpipe.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["downpipe", "pier"],
                labels: true,
                caption: "The downpipe: the last length of the journey, and the easiest one to forget.",
              },
            },
          ],
        },
      },
      {
        id: "closed-system",
        type: "choose",
        prompt: "An urban bridge crosses a navigable river. What does its drainage have to be?",
        choices: [
          "A closed system that collects the water and discharges it clear of the river and the road below",
          "An open system, letting the water fall straight off the deck",
          "No drainage at all, because the deck is high above the water",
          "A single hole at the lowest point of the deck",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "Where a bridge crosses a highway, a railway, a navigable river or a reservoir, the water cannot simply be dropped.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["roadway"],
                labels: true,
              },
            },
            {
              text: "Those crossings need a closed system: inlets into a longitudinal drain or trough, then downpipes at the piers, and out into the ground drainage — the arrangement a building uses.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["kerb-inlet", "drain", "downpipe"],
                labels: true,
                caption: "A closed system: nothing leaves the bridge except through a pipe.",
              },
            },
          ],
        },
      },
      {
        id: "sort-the-drainage-parts",
        type: "sort",
        prompt: "Sort each part of the system by the stage of the journey it works at.",
        buckets: [
          { id: "off", label: "Off the road surface" },
          { id: "along", label: "Along the deck" },
          { id: "down", label: "Down to the ground" },
        ],
        items: [
          { id: "inlet", label: "The kerb inlet that swallows the water", bucket: "off" },
          { id: "fall", label: "The cross fall that sends it to the kerb", bucket: "off" },
          { id: "trough", label: "The longitudinal trough under the pavement edge", bucket: "along" },
          { id: "pipe", label: "The downpipe bolted to the pier", bucket: "down" },
          { id: "outfall", label: "The outfall into the ground drainage", bucket: "down" },
        ],
        explanation: {
          steps: [
            {
              text: "Think of the system as three stages, and of the fall as the thing that starts all of them.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["cross-slope", "kerb-inlet"],
                labels: true,
              },
            },
            {
              text: "Then the trough carries it along, and the downpipe takes it down — one stage each, never mixed up.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["drain", "downpipe"],
                labels: true,
                caption: "Along the deck, then down the pier: two stages, two different parts.",
              },
            },
          ],
        },
      },
    ],
    "cross-slopes": [
      {
        id: "cross-slopes",
        type: "heading",
        text: "Cross Slopes",
        figure: {
          visual: { kind: "scene", scene: "cross-slope" },
          caption: "Four ways to give a deck its fall: an inclined pier top, a thicker slab, pad stones, or the slab itself.",
        },
      },
      {
        id: "why-a-cross-slope",
        type: "paragraph",
        text: "A deck is never built dead level across its width. It is given a cross slope — a fall from the crown of the road down to the kerbs — so that rainwater leaves the surface quickly instead of soaking into the pavement and standing against the waterproofing. The transverse drainage slope of the deck is made to match the transverse slope of the road surface, so a vehicle never meets a step where the bridge begins.",
        figure: {
          visual: { kind: "scene", scene: "drainage", highlight: ["cross-slope"] },
          caption: "The fall is measured across the deck rather than along it.",
        },
      },
      {
        id: "four-configurations",
        type: "concepts",
        prompt: "Four configurations. Page through them and see where the slope is made.",
        concepts: [
          {
            id: "inclined-pier",
            label: "(a) An inclined pier top",
            summary:
              "The top of the pier is cut to the fall, so the whole superstructure tilts and the pavement keeps one thickness throughout.",
            scene: "cross-slope",
            highlight: ["inclined-pier-top"],
          },
          {
            id: "slab-thickness",
            label: "(b) A slab of varying thickness",
            summary:
              "On a narrow bridge the cast-in-place slab is simply poured thicker on one side, above a main beam that stays level.",
            scene: "cross-slope",
            highlight: ["slab-thickness"],
          },
          {
            id: "pad-stones",
            label: "(c) Pad stones",
            summary:
              "On a prefabricated deck the pier can no longer tilt enough, so the pad stones on the pier cap are packed to different depths.",
            scene: "cross-slope",
            highlight: ["pad-stone"],
          },
          {
            id: "sloped-slab",
            label: "(d) A slab set to the slope",
            summary:
              "On a wide cast-in-place bridge, the roadway slab itself is set to the direction of the cross slope and nothing else is adjusted.",
            scene: "cross-slope",
            highlight: ["sloped-slab"],
          },
        ],
      },
      {
        id: "tap-the-inclined-pier-top",
        type: "hotspot",
        prompt: "Tap the panel where the pier is cut to the fall so the pavement keeps one thickness.",
        scene: "cross-slope",
        parts: ["inclined-pier-top", "slab-thickness", "pad-stone", "sloped-slab"],
        answer: "inclined-pier-top",
        labels: true,
        explanation: {
          steps: [
            {
              text: "Look at where the slope is being made in each panel: in the pier, in the slab, in the bearings, or in the slab again.",
              visual: { kind: "scene", scene: "cross-slope", labels: true },
            },
            {
              text: "In the first panel the top of the pier itself is inclined, and everything above it tilts with it.",
              visual: {
                kind: "scene",
                scene: "cross-slope",
                highlight: ["inclined-pier-top"],
                labels: true,
              },
            },
            {
              text: "That is the configuration that saves paving material and reduces dead load, because the pavement is one thickness right across the bridge.",
              visual: {
                kind: "scene",
                scene: "cross-slope",
                highlight: ["inclined-pier-top"],
                labels: true,
                caption: "An inclined pier top: the whole superstructure takes the fall together.",
              },
            },
          ],
        },
      },
      {
        id: "saves-paving-material",
        type: "choose",
        prompt: "Which configuration saves paving material and reduces the dead load on the structure?",
        choices: [
          "The inclined pier top, which lets the pavement keep one thickness",
          "Pouring a thicker slab on one side of the deck",
          "Packing pad stones to different depths on the pier cap",
          "Building the deck level and letting the water stand",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "Every extra millimetre of pavement is weight the whole bridge has to carry for the rest of its life.",
              visual: {
                kind: "scene",
                scene: "cross-slope",
                highlight: ["slab-thickness"],
                labels: true,
              },
            },
            {
              text: "Tilting the superstructure instead of thickening the surface keeps the paving at one uniform depth across the full width.",
              visual: {
                kind: "scene",
                scene: "cross-slope",
                highlight: ["inclined-pier-top"],
                labels: true,
                caption: "The saving is not in the pavement; it is in everything the pavement sits on.",
              },
            },
          ],
        },
      },
      {
        id: "sort-the-cross-slope-decks",
        type: "sort",
        prompt: "Sort each statement into the kind of deck it describes.",
        buckets: [
          { id: "narrow", label: "A narrow deck" },
          { id: "precast", label: "A prefabricated deck" },
          { id: "wide", label: "A wide cast-in-place deck" },
        ],
        items: [
          {
            id: "thicker",
            label: "The cast-in-place slab is poured thicker on one side",
            bucket: "narrow",
          },
          { id: "level-beam", label: "The main beam stays level and the fall is made above it", bucket: "narrow" },
          {
            id: "pads",
            label: "Pad stones of different depths are packed on the pier cap",
            bucket: "precast",
          },
          {
            id: "transition",
            label: "The deck sits on the transition curve of the route, so tilting the pier is not enough",
            bucket: "precast",
          },
          {
            id: "set-slab",
            label: "The roadway slab itself is set to the direction of the slope",
            bucket: "wide",
          },
          {
            id: "no-pier",
            label: "There is no narrow pier top that could carry the whole fall",
            bucket: "wide",
          },
        ],
        explanation: {
          steps: [
            {
              text: "Ask what each deck has to work with: a narrow slab, prefabricated beams and a pier cap, or a very wide deck.",
              visual: { kind: "scene", scene: "cross-slope", labels: true },
            },
            {
              text: "A narrow deck can afford to thicken its slab; a prefabricated one cannot, so it adjusts the pad stones; a wide one sets the slab itself.",
              visual: {
                kind: "scene",
                scene: "cross-slope",
                highlight: ["pad-stone", "sloped-slab"],
                labels: true,
                caption: "Same fall, three different places to make it.",
              },
            },
          ],
        },
      },
    ],
    "expansion-joints": [
      {
        id: "expansion-joints",
        type: "heading",
        text: "Expansion Joints",
        figure: {
          visual: { kind: "scene", scene: "expansion-joint" },
          caption: "A joint opened up: the gap, the device that crosses it, and the seal that catches the water.",
        },
      },
      {
        id: "why-a-bridge-needs-gaps",
        type: "paragraph",
        text: "A bridge moves. Temperature changes it, concrete shrinks and creeps, and traffic bends it. So that the span structure can deform freely and still carry vehicles smoothly, an expansion joint is fitted between two neighbouring beam ends, and between a beam end and the back wall of the abutment. The joint is exposed to the weather and takes repeated vehicle and pedestrian loading, so a very small defect is enough to make vehicles jump, which loads the joint with impact — and it becomes the part of a bridge most easily damaged and hardest to repair.",
        figure: {
          visual: {
            kind: "scene",
            scene: "expansion-joint",
            highlight: ["expansion-gap"],
          },
          caption: "A gap that is never allowed to close, and can never be sealed permanently.",
        },
      },
      {
        id: "what-a-joint-must-do",
        type: "list",
        items: [
          "Allow the bridge to expand and contract freely, with enough movement capacity for the worst case.",
          "Be firmly and reliably connected to the structure, impact-resistant and durable.",
          "Let vehicles ride across it smoothly, with no jump and as little noise as possible.",
          "Contain safe waterproofing and drainage, so rainwater cannot seep in below.",
          "Keep rubbish out, so the movement cannot be blocked.",
          "Be simple to make and install, and easy to inspect, maintain and replace.",
          "Be inexpensive.",
        ],
        figure: {
          visual: {
            kind: "scene",
            scene: "expansion-joint",
            highlight: ["joint-device", "water-seal"],
          },
          caption: "The device takes the wheels; the seal takes the water; the two jobs are never given to one part.",
        },
      },
      {
        id: "joint-types",
        type: "concepts",
        prompt: "The joints a bridge can be built with. Page through them.",
        concepts: [
          {
            id: "butt",
            label: "Butt joint",
            summary:
              "The simplest form: the two deck ends are butted together with a filler, and a plate covers the seam between them.",
            scene: "joint-types",
            highlight: ["butt-joint"],
          },
          {
            id: "shear",
            label: "Shear joint",
            summary:
              "Overlapping plates let the two ends slide past one another, taking up the movement by shearing rather than by opening.",
            scene: "joint-types",
            highlight: ["shear-joint"],
          },
          {
            id: "steel-supported",
            label: "Steel supported joint",
            summary:
              "A steel beam spans the gap and carries the wheels across it, sliding on its own seat as the deck moves.",
            scene: "joint-types",
            highlight: ["steel-supported"],
          },
          {
            id: "modular",
            label: "Modular joint",
            summary:
              "Several sealed gaps held side by side in one steel frame, for the very largest movements on the longest spans.",
            scene: "joint-types",
            highlight: ["modular-joint"],
          },
        ],
      },
      {
        id: "tour-the-joint",
        type: "parts",
        prompt: "Tap each pin on the joint detail.",
        scene: "expansion-joint",
        hint: "Five pins: pavement, gap, device, seal and the pier under all of it.",
      },
      {
        id: "the-gap-that-lets-it-move",
        type: "hotspot",
        prompt: "Tap the part that lets the deck grow and shrink.",
        scene: "expansion-joint",
        parts: ["pavement", "expansion-gap", "joint-device", "water-seal", "pier"],
        answer: "expansion-gap",
        explanation: {
          steps: [
            {
              text: "Start with what the joint is for: movement between two pieces of structure that must not touch.",
              visual: {
                kind: "scene",
                scene: "expansion-joint",
                highlight: ["joint-device"],
                labels: true,
              },
            },
            {
              text: "The device, the seal and the pier are all there to serve the opening between the two deck ends.",
              visual: {
                kind: "scene",
                scene: "expansion-joint",
                highlight: ["water-seal", "pier"],
                labels: true,
              },
            },
            {
              text: "That opening is the expansion gap: everything else in the detail exists to get a vehicle, and its water, safely past it.",
              visual: {
                kind: "scene",
                scene: "expansion-joint",
                highlight: ["expansion-gap"],
                labels: true,
                caption: "The expansion gap: the one part of a deck that is designed to be open.",
              },
            },
          ],
        },
      },
      {
        id: "why-make-the-deck-continuous",
        type: "choose",
        prompt: "On a multi-span simply supported bridge, what is the point of making two to seven spans continuous in the deck?",
        choices: [
          "It reduces the number of expansion joints, and driving becomes smoother",
          "It turns the main beams into continuous beams",
          "It removes the need for bearings at the piers",
          "It lets the bridge carry heavier traffic without any change to the design",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "A deck continuity is made in the pavement over the piers: the two simply supported spans are joined by a strengthened strip of the deck surface.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["simply-supported"],
                labels: true,
              },
            },
            {
              text: "The main beams are still simply supported. What has gone is the joint, and with it the jump, the noise and one more thing to maintain.",
              visual: {
                kind: "scene",
                scene: "beam",
                highlight: ["simply-supported", "continuous"],
                labels: true,
              },
            },
            {
              text: "Taken further, a seamless bridge removes the joints at the piers altogether — with an integral pier cap, a continuous deck, or a structure made continuous under live load.",
              visual: {
                kind: "scene",
                scene: "frame",
                highlight: ["portal-frame", "rigid-joint"],
                labels: true,
                caption: "Monolithic joints: the structure that would have needed a joint is cast as one piece.",
              },
            },
          ],
        },
      },
      {
        id: "order-the-joints",
        type: "order",
        prompt: "Order these joints by the movement they are built to take, from the least to the most.",
        items: [
          { id: "butt", label: "Butt joint — a filler and a cover plate over a narrow gap" },
          { id: "shear", label: "Shear joint — overlapping plates that slide past one another" },
          { id: "steel", label: "Steel supported joint — a steel beam sliding on its own seat" },
          { id: "modular", label: "Modular joint — several sealed gaps in one steel frame" },
        ],
        explanation: {
          steps: [
            {
              text: "The bigger the movement a joint has to swallow, the more steel it needs and the more parts it is made of.",
              visual: {
                kind: "scene",
                scene: "joint-types",
                highlight: ["butt-joint", "shear-joint"],
                labels: true,
              },
            },
            {
              text: "A butt joint takes the least; a modular joint, with several gaps working together, takes the most.",
              visual: {
                kind: "scene",
                scene: "joint-types",
                highlight: ["steel-supported", "modular-joint"],
                labels: true,
                caption: "Four joints, in the order their movement capacity grows.",
              },
            },
          ],
        },
      },
    ],
    "footways-and-railings": [
      {
        id: "footways-and-railings",
        type: "heading",
        text: "Footways, Railings & Lighting",
        figure: {
          visual: { kind: "scene", scene: "walkway" },
          caption: "A deck edge in section: road, kerb, raised footway, railing and lamp, with the two limits that shape them.",
        },
      },
      {
        id: "who-gets-a-footway",
        type: "paragraph",
        text: "Urban bridges are generally provided with footways. A bridge on an expressway should not have one, and on first- to fourth-class highways it depends on need. The width is set by the volume of pedestrians: 1.0 m is the starting width, and beyond that it grows in steps of half a metre. A safety belt is built like a footway but narrower, and as safety awareness has risen it has gradually been replaced by a proper railing.",
        figure: {
          visual: { kind: "scene", scene: "walkway", highlight: ["footway"] },
          caption: "A footway is a step higher than the road, and how wide it is follows how many people use it.",
        },
      },
      {
        id: "railing-requirements",
        type: "list",
        items: [
          "A railing has to be strong, durable, economical and visually appropriate to the bridge.",
          "Outside a footway or a safety belt it is at least 1.10 m high.",
          "The clear gap between railing members is never more than 14 cm, and horizontal-bar railings are not preferred.",
          "Beside a cycle track the railing is at least 1.40 m high.",
          "A railing at an expansion joint must be free to deform with the deck, while staying safe and looking right.",
        ],
        figure: {
          visual: { kind: "scene", scene: "walkway", highlight: ["railing"] },
          caption: "Height and the size of the gaps are the two things a railing is checked for.",
        },
      },
      {
        id: "lighting-requirements",
        type: "list",
        items: [
          "Bridges in cities and suburbs, and highway bridges where pedestrians and vehicles are numerous, are all lit.",
          "Lighting is normally by column lamps standing on the deck.",
          "The columns are set at the outer railing of the footway, or on the inner side, or in the median, according to the width of the footway and the lighting level required.",
          "The edge of a lamp base stands at least 0.25 m clear of the carriageway surface.",
          "The lamps are about 5 m above the traffic lanes.",
        ],
        figure: {
          visual: { kind: "scene", scene: "walkway", highlight: ["lamp"] },
          caption: "A lamp base too close to the traffic is a hazard of its own making.",
        },
      },
      {
        id: "tour-the-deck-edge",
        type: "parts",
        prompt: "Tap each pin along the edge of the deck.",
        scene: "walkway",
        hint: "Six pins, from the road surface across the kerb to the railing above.",
      },
      {
        id: "the-part-that-must-be-1-10-m",
        type: "hotspot",
        prompt: "Tap the part a designer must keep at least 1.10 m high.",
        scene: "walkway",
        parts: ["carriageway", "kerb", "footway", "railing", "lamp"],
        answer: "railing",
        explanation: {
          steps: [
            {
              text: "The height limit belongs to the thing that stops people falling off the bridge.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["footway", "kerb"],
                labels: true,
              },
            },
            {
              text: "It is the railing: at least 1.10 m outside a footway or a safety belt, and 1.40 m beside a cycle track.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["railing"],
                labels: true,
              },
            },
            {
              text: "The gap between its members is limited too, to 14 cm, because a child is narrower than an adult and a railing is built for both.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["railing"],
                labels: true,
                caption: "The railing: one number for its height and one for the space between its bars.",
              },
            },
          ],
        },
      },
      {
        id: "how-wide-is-a-footway",
        type: "choose",
        prompt: "How wide is a footway on a bridge?",
        choices: [
          "At least 1.0 m, and wider in steps of 0.5 m as the pedestrian traffic grows",
          "Exactly 1.0 m on every bridge",
          "At least 2.5 m, whatever the traffic",
          "Whatever width is left once the railing is fixed",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "The width is a design decision based on the pedestrian traffic volume, not on the width of the bridge.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["footway"],
                labels: true,
              },
            },
            {
              text: "It starts at 1.0 m, and above that it is increased in multiples of 0.5 m — a narrow footway cannot be widened later without rebuilding the edge.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["footway", "kerb"],
                labels: true,
                caption: "One metre, then half-metre steps: the only widths a footway comes in.",
              },
            },
          ],
        },
      },
      {
        id: "order-across-the-edge",
        type: "order",
        prompt: "Order these from the traffic outwards across the edge of a deck.",
        items: [
          { id: "carriageway", label: "The carriageway the vehicles use" },
          { id: "kerb", label: "The kerb that makes the step" },
          { id: "footway", label: "The raised footway the pedestrians use" },
          { id: "railing", label: "The railing along the outer edge" },
        ],
        explanation: {
          steps: [
            {
              text: "Everything at the edge of a deck is arranged in a fixed order, and the order is what keeps the two kinds of traffic apart.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["carriageway", "kerb"],
                labels: true,
              },
            },
            {
              text: "Road, then kerb, then footway, then railing — and the lamp stands at the edge of the footway, clear of the traffic.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["footway", "railing", "lamp"],
                labels: true,
                caption: "The section of a deck edge, from the traffic outwards.",
              },
            },
          ],
        },
      },
    ],
    "safety-barriers": [
      {
        id: "safety-barriers",
        type: "heading",
        text: "Safety Barriers",
        figure: {
          visual: { kind: "scene", scene: "barriers" },
          caption: "Three classes of barrier: a concrete wall, a corrugated beam on posts, and cables strung between posts.",
        },
      },
      {
        id: "what-a-barrier-is-for",
        type: "paragraph",
        text: "As public safety awareness has grown, protective facilities have become an essential part of bridge design rather than an addition to it. Every class of highway bridge must have a roadside barrier, and expressways and first-class highways must also have one in the median. A barrier closes the sides of the road against people, animals and non-motor vehicles; it guides the driver's line of sight; it keeps vehicles inside the carriageway and gives the driver confidence; and it absorbs the energy of a crash, turning a vehicle that has gone out of control back towards its own direction instead of letting it leave the bridge.",
        figure: {
          visual: {
            kind: "scene",
            scene: "barriers",
            highlight: ["semi-rigid-barrier"],
          },
          caption: "A barrier does not merely stop a vehicle; it steers it back onto the road.",
        },
      },
      {
        id: "three-classes-of-barrier",
        type: "concepts",
        prompt: "Three classes, told apart by what they do when they are hit. Page through them.",
        concepts: [
          {
            id: "rigid",
            label: "Rigid barrier",
            summary:
              "A concrete wall that barely deforms when it is struck: the vehicle is stopped by the barrier's own strength, and the barrier needs little repair.",
            scene: "barriers",
            highlight: ["rigid-barrier"],
          },
          {
            id: "semi-rigid",
            label: "Semi-rigid barrier",
            summary:
              "The corrugated beam is the classic form: it deforms under the impact, yet keeps enough strength and stiffness to redirect the vehicle.",
            scene: "barriers",
            highlight: ["semi-rigid-barrier"],
          },
          {
            id: "flexible",
            label: "Flexible barrier",
            summary:
              "Cables stretch a long way between their posts, so the stop is gentle on the occupants but the movement is large.",
            scene: "barriers",
            highlight: ["flexible-barrier"],
          },
        ],
      },
      {
        id: "tour-the-barriers",
        type: "parts",
        prompt: "Tap each panel to name the barrier it draws.",
        scene: "barriers",
        hint: "Three panels, three classes: rigid, semi-rigid and flexible.",
      },
      {
        id: "the-corrugated-beam",
        type: "hotspot",
        prompt: "Tap the class of barrier whose classic form is the corrugated beam.",
        scene: "barriers",
        parts: ["rigid-barrier", "semi-rigid-barrier", "flexible-barrier"],
        answer: "semi-rigid-barrier",
        explanation: {
          steps: [
            {
              text: "Sort the three by how much each one moves: none, some, or a great deal.",
              visual: { kind: "scene", scene: "barriers", labels: true },
            },
            {
              text: "A rigid barrier is concrete and hardly deforms; a flexible one is cables and stretches a long way.",
              visual: {
                kind: "scene",
                scene: "barriers",
                highlight: ["rigid-barrier", "flexible-barrier"],
                labels: true,
              },
            },
            {
              text: "Between them sits the corrugated steel beam: it deforms on impact, and that deformation is exactly what redirects the vehicle.",
              visual: {
                kind: "scene",
                scene: "barriers",
                highlight: ["semi-rigid-barrier"],
                labels: true,
                caption: "The corrugated beam: the semi-rigid barrier, and the commonest form on a highway bridge.",
              },
            },
          ],
        },
      },
      {
        id: "the-jobs-of-a-barrier",
        type: "choose",
        prompt: "Which of these is NOT one of the jobs of a bridge barrier?",
        choices: [
          "Absorbing the energy of a collision and guiding the vehicle back",
          "Closing the road edge against people, animals and non-motor vehicles",
          "Carrying the deck loads down to the piers",
          "Giving the driver a line to follow and a sense of safety",
        ],
        answer: 2,
        explanation: {
          steps: [
            {
              text: "A barrier is a safety facility: it works on the traffic, not on the structure.",
              visual: {
                kind: "scene",
                scene: "barriers",
                highlight: ["semi-rigid-barrier"],
                labels: true,
              },
            },
            {
              text: "Carrying deck loads down to the piers is the job of the superstructure and its bearings, and nothing at the edge of the deck does any of it.",
              visual: {
                kind: "scene",
                scene: "bearings",
                highlight: ["bearing", "pier-cap"],
                labels: true,
              },
            },
            {
              text: "A barrier closes the edge, guides the eye and absorbs energy — and every one of those is a job done for the driver.",
              visual: {
                kind: "scene",
                scene: "barriers",
                highlight: ["rigid-barrier", "flexible-barrier"],
                labels: true,
                caption: "Three barriers, one purpose: keep the vehicle on the bridge.",
              },
            },
          ],
        },
      },
      {
        id: "sort-the-barriers",
        type: "sort",
        prompt: "File each description under the class of barrier it belongs to.",
        buckets: [
          { id: "rigid", label: "Rigid" },
          { id: "semi", label: "Semi-rigid" },
          { id: "flexible", label: "Flexible" },
        ],
        items: [
          { id: "wall", label: "A concrete wall that barely deforms when it is struck", bucket: "rigid" },
          { id: "parapet", label: "A solid parapet in which the vehicle is stopped at once", bucket: "rigid" },
          { id: "beam", label: "A corrugated steel beam that bends, then redirects", bucket: "semi" },
          { id: "posts", label: "A beam on posts, with strength and stiffness left after the impact", bucket: "semi" },
          { id: "cables", label: "Cables between posts that stretch a long way", bucket: "flexible" },
          { id: "gentle", label: "The barrier that gives the gentlest stop of the three", bucket: "flexible" },
        ],
        explanation: {
          steps: [
            {
              text: "The classes are named for how the barrier behaves in a collision, so the question to ask is always: what moves, and how much?",
              visual: { kind: "scene", scene: "barriers", labels: true },
            },
            {
              text: "Concrete barely moves, a corrugated beam deforms and recovers the vehicle's direction, and cables move a long way.",
              visual: {
                kind: "scene",
                scene: "barriers",
                highlight: ["rigid-barrier", "semi-rigid-barrier", "flexible-barrier"],
                labels: true,
                caption: "Rigid, semi-rigid, flexible: the same protection delivered three different ways.",
              },
            },
          ],
        },
      },
    ],
    "deck-check": [
      {
        id: "level-check-build-the-deck",
        type: "heading",
        text: "Level Check: Build the Deck",
        figure: {
          visual: { kind: "scene", scene: "deck-layout" },
          caption: "The whole of Module 3 on one deck: layers, water, movement and safety.",
        },
      },
      {
        id: "the-deck-in-one-set-of-questions",
        type: "paragraph",
        text: "Nearly everything above the main structure belongs to one of four systems: the deck pavement, the waterproofing and drainage, the expansion joints, and the safety facilities — the footways, railings, barriers and lighting. Here is the whole module as one set of questions.",
        figure: {
          visual: {
            kind: "scene",
            scene: "walkway",
            highlight: ["footway", "railing", "lamp"],
          },
          caption: "The safety facilities of a deck: a walkway, a railing and a lamp, all on one section.",
        },
      },
      {
        id: "the-layer-under-everything",
        type: "hotspot",
        prompt: "Tap the layer that has to be continuous under the whole deck.",
        scene: "waterproofing",
        parts: ["wearing-course", "waterproof-layer", "deck-slab", "kerb", "drain"],
        answer: "waterproof-layer",
        explanation: {
          steps: [
            {
              text: "Only one layer has to run from edge to edge without a break, and it is the one that carries no load.",
              visual: {
                kind: "scene",
                scene: "waterproofing",
                highlight: ["wearing-course", "deck-slab"],
                labels: true,
              },
            },
            {
              text: "It is the waterproof layer, turned up at the kerb and joined into the drain, so that water has nowhere to go but away.",
              visual: {
                kind: "scene",
                scene: "waterproofing",
                highlight: ["waterproof-layer"],
                labels: true,
                caption: "The one layer of a deck that must never be interrupted.",
              },
            },
          ],
        },
      },
      {
        id: "file-the-deck-parts",
        type: "sort",
        prompt: "File each part of the deck under the system it belongs to.",
        buckets: [
          { id: "pavement", label: "Deck pavement" },
          { id: "water", label: "Waterproofing and drainage" },
          { id: "joints", label: "Expansion joints" },
          { id: "safety", label: "Safety facilities" },
        ],
        items: [
          { id: "wearing", label: "The wearing course the tyres run on", bucket: "pavement" },
          { id: "mesh", label: "The steel mesh inside the concrete pavement", bucket: "pavement" },
          { id: "sheet", label: "The sheet that turns up at the kerb", bucket: "water" },
          { id: "inlet", label: "The grated inlet at the edge of a lane", bucket: "water" },
          { id: "gap", label: "The opening between two deck ends", bucket: "joints" },
          { id: "device", label: "The plate that carries wheels across that opening", bucket: "joints" },
          { id: "rail", label: "The barrier that keeps pedestrians on the bridge", bucket: "safety" },
          { id: "column", label: "The lighting column at the edge of the footway", bucket: "safety" },
        ],
        explanation: {
          steps: [
            {
              text: "Each system is a group of parts that only makes sense together, and each part belongs to exactly one of them.",
              visual: {
                kind: "scene",
                scene: "deck-layout",
                highlight: ["carriageway", "footway", "railing"],
                labels: true,
              },
            },
            {
              text: "Pavement takes the wear, the sheet and the pipes deal with water, the joint lets the deck move, and the rest keeps people safe.",
              visual: {
                kind: "scene",
                scene: "deck-layout",
                highlight: ["expansion-joint", "drain", "lamp"],
                labels: true,
                caption: "Four systems, one deck, and every part filed under one of them.",
              },
            },
          ],
        },
      },
      {
        id: "build-the-deck-edge",
        type: "assemble",
        prompt: "Put the edge of the deck together: place each part where it belongs on the section.",
        scene: "walkway",
        slots: [
          { id: "carriageway", label: "Carriageway", at: [60, 116] },
          { id: "footway", label: "Footway", at: [240, 116] },
          { id: "railing", label: "Railing", at: [296, 88] },
          { id: "lamp", label: "Lamp post", at: [214, 60] },
        ],
        explanation: {
          steps: [
            {
              text: "Work from the road outwards: the traffic lanes are lowest, and the walkway stands a step above them.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["carriageway", "kerb"],
                labels: true,
              },
            },
            {
              text: "The railing closes the outer edge, and the lamp belongs on the walkway, its base clear of the traffic.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["railing", "lamp"],
                labels: true,
                caption: "The finished edge: road, kerb, footway, railing, and a lamp where nobody drives.",
              },
            },
          ],
        },
      },
      {
        id: "order-the-design-work",
        type: "order",
        prompt: "Order the work of designing a deck, as a designer would do it.",
        items: [
          { id: "read", label: "Read what the bridge has to carry: vehicles, pedestrians, and how many of each" },
          { id: "slope", label: "Set the cross slope, so the water has somewhere to go" },
          { id: "pave", label: "Lay the pavement and the waterproofing under it" },
          { id: "joint", label: "Detail the expansion joints where the deck must move" },
          { id: "safe", label: "Add the footways, railings, barriers and lighting" },
        ],
        explanation: {
          steps: [
            {
              text: "The drainage comes before the surfaces, because the fall has to be built into the structure, not laid on top of it.",
              visual: {
                kind: "scene",
                scene: "cross-slope",
                highlight: ["sloped-slab"],
                labels: true,
              },
            },
            {
              text: "The joints follow the surfaces, and the safety facilities come last, where they can be adjusted to the widths that are left.",
              visual: {
                kind: "scene",
                scene: "expansion-joint",
                highlight: ["pavement", "expansion-gap"],
                labels: true,
                caption: "Water first, then surfaces, then movement, then the things that keep people safe.",
              },
            },
          ],
        },
      },
      {
        id: "a-deck-for-a-cold-city",
        type: "choose",
        prompt: "One last one. A new urban bridge over a river, well used by pedestrians, in a city with freezing winters. Which deck is the sensible one?",
        choices: [
          "Waterproofed asphalt pavement, a closed drainage system, continuous joints where possible, and footways with 1.10 m railings and lighting",
          "Waterproof concrete with no drainage, because the deck already has a fall",
          "No waterproofing, because the deck is in compression",
          "A dead-level deck, so that the water can evaporate instead of running off",
        ],
        answer: 0,
        explanation: {
          steps: [
            {
              text: "Freezing winters mean water in the deck is a durability problem, not only a driving one, so waterproofing and drainage have to work together.",
              visual: {
                kind: "scene",
                scene: "waterproofing",
                highlight: ["waterproof-layer", "drain"],
                labels: true,
              },
            },
            {
              text: "An urban bridge over a river needs a closed system, and every joint that can be removed makes driving smoother and maintenance cheaper.",
              visual: {
                kind: "scene",
                scene: "drainage",
                highlight: ["kerb-inlet", "drain", "downpipe"],
                labels: true,
              },
            },
            {
              text: "Pedestrians get a footway with a railing of the right height and lighting above it — and a level deck is never an option, because water that cannot run off has to be carried.",
              visual: {
                kind: "scene",
                scene: "walkway",
                highlight: ["footway", "railing", "lamp"],
                labels: true,
                caption: "The deck this bridge needs: protected, drained, walkable and lit.",
              },
            },
          ],
        },
      },
    ],
  },

  // ── Module 4 · Materials & Durability ────────────────────────────────────
  ...bridgeMaterialsContent,
};
