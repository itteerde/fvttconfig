const spells = [
    {//0
        known: [],
        prepared: []
    }
];

spells.push({//1
    known: [
        ["Fire Bolt", "Minor Illusion", "Prestidigitation"],//0
        ["Detect Magic", "Feather Fall", "Find Familiar", "Healing Word", "Mage Armor", "Shield", "Silvery Barbs"],//1
        [],//2
        [],//3
        [],//4
        [],//5
        [],//6
        [],//7
        [],//8
        []//9
    ],
    prepared: [
        [],//0
        ["Feather Fall", "Healing Word", "Mage Armor", "Shield", "Silvery Barbs"],//1
        [],//2
        [],//3
        [],//4
        [],//5
        [],//6
        [],//7
        [],//8
        []//9
    ]
});

//2
spells.push(spells[1]);
spells[2].known[1].push("Absorb Elements", "Identify", "Tenser's Floating Disc");
spells[2].known[1].sort();

console.log({ message: "Shrazz' Spells", spells: spells });