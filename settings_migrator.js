"use strict"

const DefaultSettings = {
     "allySkills": {
        "6": [  // Priest
            19, // Focus Heal
            37  // Immersion
        ],
        "7": [  // Mystic
            5,  // Titanic Favor
            9   // Arun's Cleansing Touch
        ]
    },
	 "enemySkills": {
        "6": [  // Priest
			30, // Plague
			33, // Sleep
			35	// EStars
        ],
        "7": [  // Mystic
			24, // VoC
			28, // Sleep
			41 	// Contagion
        ]
    },
	
    "autoCast": true,     // true = skills auto lockon and cast. false = pre-lockon onto targets and casting is done manually
    "autoHeal": true,     // enable healing skills
    "autoCleanse": true,  // enable mystic cleanse
	"autoDebuff" : true,  // enable debuff lock-ons
    "hpCutoff": 97,       // (healing only) ignore members that have more HP% than this
    "maxDistance": 30,    // in-game meters. can work up to 30m	
    "lockSpeed": 30,      // delay for locking on targets.
    "castSpeed": 50       // delay for casting skills. castSpeed needs to be greater than lockSpeed.
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
    if (from_ver === undefined) {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings);
    } else if (from_ver === null) {
        // No config file exists, use default settings
        return DefaultSettings;
    } else {
        // Migrate from older version (using the new system) to latest one
        if (from_ver + 1 < to_ver) {
            // Recursively upgrade in one-version steps
            settings = MigrateSettings(from_ver, from_ver + 1, settings);
            return MigrateSettings(from_ver + 1, to_ver, settings);
        }

        // If we reach this point it's guaranteed that from_ver === to_ver - 1, so we can implement
        // a switch for each version step that upgrades to the next version. This enables us to
        // upgrade from any version to the latest version without additional effort!
		
        switch(to_ver)
        {
			// keep old settings, add new ones
			case 3:
				if(!settings.enemySkills[6]) setting.enemySkills[6] = [];
				settings.enemySkills[6].push(35);
				
				break;
			case 2:
				settings.allySkills = DefaultSettings.allySkills;
				settings.enemySkills = DefaultSettings.enemySkills;
				settings.autoDebuff = DefaultSettings.autoDebuff;
				
				break;
			default:
				let oldsettings = settings
				
				settings = Object.assign(DefaultSettings, {});
				
				for(let option in oldsettings) {
					if(settings[option]) {
						settings[option] = oldsettings[option]
					}
				}

				if(from_ver < to_ver) console.log('[Auto Heal] Your settings have been updated to version ' + to_ver + '. You can edit the new config file after the next relog.')
				break;
        }

        return settings;
    }
}