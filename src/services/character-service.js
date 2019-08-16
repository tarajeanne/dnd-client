const characterHelper = {
  createCharacter() {
    return {
      name: '',
      race: '',
      class: '',
      physical_desc: '',
      other_desc: '',
      background: '',
      alignment: '',
      size: '',
      speed: 0,
      languages: [
        {
          name: 'Common',
          variable: false,
          depends_on: null
        }
      ],
      asi: [],
      weap_prof: [],
      tool_prof: [],
      save_prof: [],
      check_prof: [],
      armor_prof: [],
      skills: {},
      features: {},
      prof_bonus: 2,
      hitDice: '',
      hp: 0,
      abilities: {
        constitution: {
          base: 0,
          total: 0,
          mod: 0
        },
        strength: {
          base: 0,
          total: 0,
          mod: 0
        },
        dexterity: {
          base: 0,
          total: 0,
          mod: 0
        },
        charisma: {
          base: 0,
          total: 0,
          mod: 0
        },
        intelligence: {
          base: 0,
          total: 0,
          mod: 0
        },
        wisdom: {
          base: 0,
          total: 0,
          mod: 0
        }
      },
      ability_checks: {
        acrobatics: {
          mod: 0,
          prof: 0,
          total: 0
        },
        'animal handling': {
          mod: 0,
          prof: 0,
          total: 0
        },
        arcana: {
          mod: 0,
          prof: 0,
          total: 0
        },
        athletics: {
          mod: 0,
          prof: 0,
          total: 0
        },
        deception: {
          mod: 0,
          prof: 0,
          total: 0
        },
        history: {
          mod: 0,
          prof: 0,
          total: 0
        },
        insight: {
          mod: 0,
          prof: 0,
          total: 0
        },
        intimidation: {
          mod: 0,
          prof: 0,
          total: 0
        },
        investigation: {
          mod: 0,
          prof: 0,
          total: 0
        },
        medicine: {
          mod: 0,
          prof: 0,
          total: 0
        },
        nature: {
          mod: 0,
          prof: 0,
          total: 0
        },
        perception: {
          mod: 0,
          prof: 0,
          total: 0
        },
        performance: {
          mod: 0,
          prof: 0,
          total: 0
        },
        persuasion: {
          mod: 0,
          prof: 0,
          total: 0
        },
        religion: {
          mod: 0,
          prof: 0,
          total: 0
        },
        'sleight of hand': {
          mod: 0,
          prof: 0,
          total: 0
        },
        stealth: {
          mod: 0,
          prof: 0,
          total: 0
        },
        survival: {
          mod: 0,
          prof: 0,
          total: 0
        }
      },
      equipment: [],
      spells_known: [],
      spell_slots: [],
      spells_memorized: []
    };
  },

  updateName(character, name) {
    const newChar = { ...character };
    newChar.name = name;
    return newChar;
  },

  updateRace(character, race) {
    const newChar = { ...character };
    newChar.race = race.name;
    const staticAttributes = ['size', 'speed', 'traits'];

    staticAttributes.forEach((att) => {
      newChar[att] = race[att];
    });

    const variableAttributes = ['asi', 'languages', 'weap_prof', 'tool_prof'];

    variableAttributes.forEach((att) => {
      newChar[att] = newChar[att].filter((i) => i.depends_on !== 'race');
      if (race[att]) {
        newChar[att].push(...race[att]);
      }
    });

    return newChar;
  },

  updateClass(character, newClass) {
    const newChar = { ...character };
    newChar.class = newClass.name;
    const staticAttributes = [
      'skills',
      'hit_dice',
      'spell_slots',
      'spells_known',
      'num_spells_known',
      'save_prof'
    ];

    staticAttributes.forEach((att) => {
      newChar[att] = newClass[att];
    });

    const variableAttributes = [
      'armor_prof',
      'weap_prof',
      'tool_prof',
      'check_prof',
      'equipment'
    ];
    variableAttributes.forEach((att) => {
      newChar[att] = newChar[att].filter((i) => i.depends_on !== 'class');
      if (newClass[att]) {
        newChar[att].push(...newClass[att]);
      }
    });

    return newChar;
  },

  updateBackground(character, background) {
    const newChar = { ...character };
    newChar.background = background.name;
    newChar.feature = background.feature;

    const variableAttributes = ['check_prof', 'languages', 'equipment'];
    variableAttributes.forEach((att) => {
      newChar[att] = newChar[att].filter((i) => i.depends_on !== 'background');
      if (background[att]) {
        newChar[att].push(...background[att]);
      }
    });
    return newChar;
  },

  updateAsi(character, index, name) {
    const newChar = { ...character, asi: [...character.asi] };
    newChar.asi[index].name = name;
    this.updateStats(newChar);
    return newChar;
  },

  updateStatBase(character, stat, num) {
    const newChar = { ...character, abilities: {...character.abilities} };
    newChar.abilities[stat].base = num;
    this.updateStats(newChar);
    return newChar;
  },

  updateCheckProf(character, index, name) {
    const newChar = { ...character, check_prof: [...character.check_prof] };
    newChar.check_prof[index].name = name;
    this.updateStats(newChar);
    return newChar;
  },

  updateStats(character) {
    for (let stat in character.abilities) {
      character.abilities[stat].total = character.abilities[stat].base;
      character.asi.forEach((asi) => {
        if (asi.name === stat) {
          character.abilities[stat].total = character.abilities[stat].base + asi.magnitude;
        }
      });
      character.abilities[stat].mod = Math.trunc((character.abilities[stat].total - 10)/2);
    };
    const strengthChecks = ['strength', 'athletics'];
    const dexChecks = ['dexterity', 'acrobatics', 'sleight of hand', 'stealth'];
    const intChecks = ['intelligence', 'arcana', 'history', 'investigation', 'nature', 'religion'];
    const wisChecks = ['wisdom', 'animal handling', 'insight', 'medicine', 'perception', 'survival'];
    const charChecks = ['charisma', 'deception', 'intimidation', 'performance', 'persuasion'];
    const allChecks = [strengthChecks, dexChecks, intChecks, wisChecks, charChecks];
    for (let check in character.ability_checks) {
      allChecks.forEach(checkList => {
        if (checkList.includes(check)) {
          character.ability_checks[check].mod = character.abilities[checkList[0]].mod;
        }
      });
    }

    character.check_prof.forEach(prof => {
      if (prof.name){
        character.ability_checks[prof.name].prof = Math.floor(character.prof_bonus * (prof.coef || 1));
      }
    });

    Object.values(character.ability_checks).forEach(check => {
      check.total = check.mod + check.prof;
    })
  }
};

export default characterHelper;
