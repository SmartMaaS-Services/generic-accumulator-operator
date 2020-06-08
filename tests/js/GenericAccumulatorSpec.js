/* globals MockMP */

(function () {

    "use strict";

    describe("GenericAccumulator", function () {

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'operator'
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
        });

        it("Dummy test", function () {
            expect(true).toBeTruthy();
        });

    });
})();
