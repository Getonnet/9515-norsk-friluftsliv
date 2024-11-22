// inside calender functionality
document.addEventListener("DOMContentLoaded", function () {
    const options = {
        type: "multiple",
        months: 2,
        jumpMonths: 2,
        settings: {
            range: {},
            selection: {
                day: "multiple-ranged",
            },
            visibility: {
                daysOutside: false,
            },
        },
        actions: {
            clickDay(e, self) {},
        },
        CSSClasses: {
            calendar: "vanilla-calendar",
            arrowPrev: "vanilla-calendar-arrow_prev",
            arrowNext: "vanilla-calendar-arrow_next",
            content: "vanilla-calendar-content",
        },
    };

    const calendar = new VanillaCalendar("#calendar", options);
    calendar.init();

    // Utility function to set the calendar's selected dates
    function updateCalendarSelection(dates) {
        if (!Array.isArray(dates) || dates.length === 0) {
            console.error("Invalid dates array");
            return;
        }

        console.log(dates); // Debug log for passed dates

        // Ensure the `dates` are in ISO string format without time
        const formattedDates = dates.map((date) => date.toISOString().split("T")[0]);

        // Update the calendar settings with new dates
        calendar.settings.selected.dates = formattedDates;

        // Update the calendar instance to apply changes
        calendar.update({ dates: true });

        // Trigger the onSelect action if available
        if (typeof calendar.onSelect === "function") {
            calendar.onSelect(calendar.settings.selected.dates);
        }
    }

    const todayBtn = document.getElementById("todayBtn");
    const thisWeekendBtn = document.getElementById("thisWeekendBtn");
    const nextWeekBtn = document.getElementById("nextWeekBtn");
    const thisMonthBtn = document.getElementById("thisMonthBtn");

    todayBtn.addEventListener("click", () => {
        const today = new Date();
        updateCalendarSelection([today]);
    });

    thisWeekendBtn.addEventListener("click", () => {
        const today = new Date();
        const saturday = new Date(today.setDate(today.getDate() + (6 - today.getDay())));
        const sunday = new Date(saturday);
        sunday.setDate(saturday.getDate() + 1);
        updateCalendarSelection([saturday, sunday]);
    });

    nextWeekBtn.addEventListener("click", () => {
        const today = new Date();
        const startOfNextWeek = new Date(today.setDate(today.getDate() + (7 - today.getDay())));
        const endOfNextWeek = new Date(startOfNextWeek);
        endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

        const dates = [];
        for (let d = new Date(startOfNextWeek); d <= endOfNextWeek; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }
        updateCalendarSelection(dates);
    });

    thisMonthBtn.addEventListener("click", () => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const dates = [];
        for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }
        updateCalendarSelection(dates);
    });
});
document.documentElement.dataset.theme = "light";

// Function to toggle the container visibility
function toggleContainerVisibility() {
    const trigger = document.getElementById("date_select-trigger");
    const datePickerDropdown = document.getElementById("datepicker");
    const closeButton = document.getElementById("close-datepicker");

    const popperInstance = Popper.createPopper(trigger, datePickerDropdown, {
        placement: "bottom-end",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 10],
                },
            },
        ],
    });

    function show() {
        datePickerDropdown.setAttribute("data-show", "");
        // We need to tell Popper to update the tooltip position
        // after we show the tooltip, otherwise it will be incorrect
        popperInstance.update();
    }

    function hide() {
        datePickerDropdown.removeAttribute("data-show");
    }

    trigger.addEventListener("click", function () {
        if (datePickerDropdown.getAttribute("data-show") === "") hide();
        else show();
    });

    closeButton.addEventListener("click", hide);
}
// init date range picker
toggleContainerVisibility();

// Function to close the container when the close button is clicked
function closeContainer(event) {
    event.stopPropagation(); // Prevent triggering the parent div's onClick event
    const container = document.getElementById("datepicker");
    container.style.display = "none";
}
