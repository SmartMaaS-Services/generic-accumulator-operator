/*
 * Generic Accumulator
 * https://github.com/yclausen/generic-accumulator-operator
 *
 * Copyright (c) 2020 FIWARE
 * Licensed under the MIT license.
 */

const list = {};

(function () {

    "use strict";

    const parseInputEndpointData = function parseInputEndpointData(entities) {
        if (typeof entities === "string") {
            try {
                entities = JSON.parse(entities);
            } catch (e) {
                throw new MashupPlatform.wiring.EndpointTypeError();
            }
        }

        if (entities == null || typeof entities !== "object") {
            throw new MashupPlatform.wiring.EndpointTypeError();
        }

        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        return entities;
    };

    const accumulateInputData = function accumulateInputData(entity) {
        list[entity.id] = entity;
    };

    const sendCollectionToOutput = function () {
        if (!MashupPlatform.operator.outputs.listOutput.connected) {
            return;
        }

        let output = [];
        for (let entity in list) {
            output.push(list[entity]);

        }

        MashupPlatform.wiring.pushEvent('listOutput', output);

    };

    if (window.MashupPlatform != null) {
        let entities;

        MashupPlatform.wiring.registerCallback("entityInput", function (data) {
            entities = parseInputEndpointData(data);
            entities.forEach(accumulateInputData);
            sendCollectionToOutput();
        });
    }

})();
