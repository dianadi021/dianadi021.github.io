<script setup>
import { onMounted, ref } from 'vue';
import TextInput from "./TextInput.vue";

const { model } = defineProps({
    model: {
        type: String,
        required: false
    },
    isAuto: {
        type: Boolean,
        required: false
    }
});

$(document).ready(function () {
    // JQUERY SETUP START
    (function (factory) {
        if (typeof define === "function" && define.amd) {
            define(["../widgets/datepicker"], factory);
        } else {
            factory(jQuery.datepicker);
        }
    }(function (datepicker) {

        const monthNames = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

        const dayNames = [
            "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
        ];

        const dayNamesShort = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
        const dayNamesMin = ["Mng", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

        datepicker.regional.id = {
            closeText: "Tutup",
            prevText: "&#x3C;mundur",
            nextText: "maju&#x3E;",
            currentText: "Hari ini",
            monthNames: monthNames,
            monthNamesShort: monthNames.map(name => name.slice(0, 3)),
            dayNames: dayNames,
            dayNamesShort: dayNamesShort,
            dayNamesMin: dayNamesMin,
            weekHeader: "Mg",
            dateFormat: "dd-mm-yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };

        datepicker.setDefaults(datepicker.regional.id);

        return datepicker.regional.id;

    }));
    (function (factory) {
        if (typeof define === "function" && define.amd) {
            define(["../widgets/datetimepicker"], factory);
        } else {
            factory(jQuery.datetimepicker);
        }
    }(function (datetimepicker) {
        return datetimepicker.setLocale('id');
    }));
    // JQUERY SETUP END

    $("input[model=set_datepicker]").datepicker({
        dateFormat: 'dd-mm-yy'
    });

    $("input[model=set_datetime]").datetimepicker({
        format: 'd-m-Y H:i',
        lang: 'id',
        timepicker: true,
        datepicker: true,
        step: 5,
        scrollMonth: false,
        scrollInput: false
    });

    $("input[model=set_date]").datetimepicker({
        format: 'd-m-Y',
        lang: 'id',
        timepicker: false,
        datepicker: true,
        step: 5,
        scrollMonth: false,
        scrollInput: false
    });

    $("input[model=set_time]").datetimepicker({
        format: 'H:i',
        lang: 'id',
        timepicker: true,
        datepicker: false,
        step: 5,
        scrollMonth: false,
        scrollInput: false
    });

    // AUTOCOMPLETE SECTON START
    $("#auto_spin").hide();
    function autoloading() {
        $("#auto_search").hide();
        $("#auto_spin").show();
    }
    const datas = [
        {
            value: "jquery",
            label: "jQuery",
            desc: "the write less, do more, JavaScript library",
            icon: "jquery_32x32.png"
        },
        {
            value: "jquery-ui",
            label: "jQuery UI",
            desc: "the official user interface library for jQuery",
            icon: "jqueryui_32x32.png"
        },
        {
            value: "sizzlejs",
            label: "Sizzle JS",
            desc: "a pure-JavaScript CSS selector engine",
            icon: "sizzlejs_32x32.png"
        }
    ];
    $("input[model=auto_tags]").autocomplete({
        minLength: 3,
        source: function (request, response) {
            const { term } = request;
            autoloading();

            setTimeout(function () {
                response(datas.filter((list) => ((list.label).toLowerCase()).includes(term.toLowerCase())));
            }, 1500);
        },
        search: function () {
            autoloading();
        },
        response: function () {
            $("#auto_spin").hide();
            $("#auto_search").show();
        },
        focus: function (event, ui) {
            $(this).val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            $(this).val(ui.item.label);
            return false;
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        const { label, desc } = item;
        return $("<li>")
            .append(`<div>${label} </br> ${desc}</div>`)
            .appendTo(ul);
    };
    // AUTOCOMPLETE SECTON END
});
</script>

<template>
    <div class="autocomplete-wrapper">
        <TextInput modelValue="" :model="model" />
        <span v-if="isAuto" class="icon">
            <i id="auto_spin" class="fas fa-spinner fa-spin"></i>
            <i id="auto_search" class="fas fa-search"></i>
        </span>
    </div>
</template>

<style>
.ui-autocomplete {
    max-height: 125px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>

<style scoped>
.autocomplete-wrapper {
    position: relative;
    display: inline-block;
    width: 300px;
}

input {
    width: 100%;
    padding: 8px 32px 8px 12px;
    box-sizing: border-box;
}

.icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #ccc;
    pointer-events: none;
}
</style>

<!-- 
<ModifyInput model="set_datepicker"></ModifyInput>
<ModifyInput model="set_date"></ModifyInput>
<ModifyInput model="set_datetime"></ModifyInput>
<ModifyInput model="set_time"></ModifyInput>
<ModifyInput model="auto_tags" :isAuto="true"></ModifyInput> 
-->