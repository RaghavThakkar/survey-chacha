"use strict";
(function () {
    function confirmDelete() {
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = '/flights/ticket-list';
            }
        });
    }
    function Start() {
        console.log("App Started");
        confirmDelete();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map