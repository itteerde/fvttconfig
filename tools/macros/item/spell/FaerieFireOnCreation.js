/**
 * Effect-Macro Macro for Faerie Fire onCreation
 * 
 * https://www.dndbeyond.com/spells/faerie-fire
 * https://github.com/itteerde/fvttconfig/issues/73
 */

const macroLabel = "Faerie Fire";
const icon = "icons/magic/fire/projectile-meteor-salvo-strong-teal.webp";
const flagKey = "flags.world.faerieFire";

console.log({ message: `${macroLabel}`, arguments: arguments, token: token });

// if not in Effect-Macro (but on Control Bar for GM correcting wrong targeting)
if (typeof effect === "undefined") {
    effectData = {
        "label": "Faerie Fire",
        "icon": "icons/magic/fire/projectile-meteor-salvo-strong-teal.webp",
        "origin": "Actor.ZtcZ8OdyJl1byKkr.Item.KLoFoT7n9cTUCdTT",
        "duration": {
            "seconds": 60,
            "startTime": 2040,
            "combat": null,
            "rounds": null,
            "turns": null,
            "startRound": null,
            "startTurn": null
        },
        "disabled": false,
        "_id": "74MXgYjX77Mu51al",
        "changes": [],
        "tint": null,
        "transfer": false,
        "flags": {
            "effectmacro": {
                "onCreate": {
                    "script": "/**\n * Effect-Macro Macro for Faerie Fire onCreation\n * \n * https://www.dndbeyond.com/spells/faerie-fire\n * https://github.com/itteerde/fvttconfig/issues/73\n */\n\nconst macroLabel = \"Faerie Fire\";\nconst icon = \"icons/magic/fire/projectile-meteor-salvo-strong-teal.webp\";\nconst flagKey = \"flags.world.faerieFire\";\n\nconsole.log({ message: `${macroLabel}`, arguments: arguments, token: token });\n\nconst lightData = {\n    config: {\n        alpha: 0.5,\n        angle: 360,\n        bright: 0,\n        color: \"#37b800\",\n        coloration: 1,\n        dim: 10,\n        attenuation: 0.5,\n        luminosity: 0.5,\n        saturation: 0,\n        contrast: 0,\n        shadows: 0,\n        animation: {\n            type: null,\n            speed: 5,\n            intensity: 5,\n            reverse: false\n        },\n        darkness: {\n            min: 0,\n            max: 1\n        }\n    },\n    x: token.center.x,\n    y: token.center.y\n};\n\nconst created = await canvas.scene.createEmbeddedDocuments(\"AmbientLight\", [lightData]);\nconst lightCreated = created[0];\n\nconsole.log({ message: `${macroLabel}, after .createEmbeddedDocuments(\"AmbientLight\", [lightData]).`, created: created, lightCreated: lightCreated, lightCreatedAsObject: lightCreated.toObject() });\n\nconsole.log({ message: `${macroLabel}`, effect: effect, originMaybe: effect.origin });\n\n//foundry.utils.setProperty(lightData, \"flags.origin\", effect.flags.origin);\n//await created.update({lightData});\n\nlightCreated.setFlag(\"world\", \"origin\", effect.origin);\nlightCreated.setFlag(\"world\", \"effect\", effect.id);\n\nconsole.log({ message: `${macroLabel}.`, lightCreated: lightCreated, lightCreatedAsObject: lightCreated.toObject() });\n\ntokenAttacher.attachElementsToToken([lightCreated], token);\n\nlet params =\n    [{\n        filterType: \"glow\",\n        filterId: macroLabel,\n        outerStrength: 4,\n        innerStrength: 0,\n        color: 0x003300,\n        quality: 0.5,\n        padding: 10,\n        animated:\n        {\n            color:\n            {\n                active: true,\n                loopDuration: 3000,\n                animType: \"colorOscillation\",\n                val1: 0x006600,\n                val2: 0x00FF00\n            }\n        }\n    }];\n\nawait TokenMagic.addUpdateFilters(token, params);"
                },
                "onDelete": {
                    "script": "/**\n * Effect-Macro Macro for Faerie Fire onDeletion\n * \n * https://www.dndbeyond.com/spells/faerie-fire\n * https://github.com/itteerde/fvttconfig/issues/73\n */\n\nconst macroLabel = \"Faerie Fire\";\nconst icon = \"icons/magic/fire/projectile-meteor-salvo-strong-teal.webp\";\nconst flagKey = \"flags.world.faerieFire\";\n\nconsole.log({ message: `${macroLabel}, onDeletion`, arguments: arguments, actor: actor, token: token, effect: effect });\n\nconst lightsCreatedByThisEffect = canvas.scene.lights.filter(l => l.flags?.world?.origin === effect.origin && l.flags?.world?.effect === effect.id);\nawait canvas.scene.deleteEmbeddedDocuments(\"AmbientLight\", lightsCreatedByThisEffect.map(l => l.id));\n\nawait TokenMagic.deleteFilters(token, macroLabel);"
                }
            },
            "effective-transferral": {
                "transferBlock": {
                    "button": false,
                    "chat": false,
                    "displayCard": false
                },
                "transferrable": {
                    "self": true,
                    "target": true
                }
            },
            "dae": {
                "selfTarget": false,
                "selfTargetAlways": false,
                "stackable": "none",
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "core": {
                "statusId": ""
            },
            "times-up": {
                "isPassive": false
            }
        }
    }
    await token.actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
    return;
}

const lightData = {
    config: {
        alpha: 0.5,
        angle: 360,
        bright: 0,
        color: "#37b800",
        coloration: 1,
        dim: 10,
        attenuation: 0.5,
        luminosity: 0.5,
        saturation: 0,
        contrast: 0,
        shadows: 0,
        animation: {
            type: null,
            speed: 5,
            intensity: 5,
            reverse: false
        },
        darkness: {
            min: 0,
            max: 1
        }
    },
    x: token.center.x,
    y: token.center.y
};

const created = await canvas.scene.createEmbeddedDocuments("AmbientLight", [lightData]);
const lightCreated = created[0];

console.log({ message: `${macroLabel}, after .createEmbeddedDocuments("AmbientLight", [lightData]).`, created: created, lightCreated: lightCreated, lightCreatedAsObject: lightCreated.toObject() });

console.log({ message: `${macroLabel}`, effect: effect, originMaybe: effect.origin });

//foundry.utils.setProperty(lightData, "flags.origin", effect.flags.origin);
//await created.update({lightData});

lightCreated.setFlag("world", "origin", effect.origin);
lightCreated.setFlag("world", "effect", effect.id);


console.log({ message: `${macroLabel}.`, lightCreated: lightCreated, lightCreatedAsObject: lightCreated.toObject() });

tokenAttacher.attachElementsToToken([lightCreated], token);

let params =
    [{
        filterType: "glow",
        filterId: macroLabel,
        outerStrength: 4,
        innerStrength: 0,
        color: 0x003300,
        quality: 0.5,
        padding: 10,
        animated:
        {
            color:
            {
                active: true,
                loopDuration: 3000,
                animType: "colorOscillation",
                val1: 0x006600,
                val2: 0x00FF00
            }
        }
    }];

await TokenMagic.addUpdateFilters(token, params);