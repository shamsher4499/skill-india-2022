
function getARCDescrption() {
    $.ajax({
        url: '../AgeRelaxation/getARCDescription',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{arcCode:'" + $("#arc_relaxationcode").val() + "'}",
        success: function (data) {
            $("#arc_desc").val(data.Description);

        }
    });
}

function getExamFromNotification() {
    var exam = $("#noId_exId").val();
    var arr = exam.split(',');
    if (arr[1] == 8) {
        $(".GroupB").prop("disabled", false);
        $(".GroupC").prop("disabled", false);
    }
    else {
        $(".GroupB").prop("disabled", true);
        $(".GroupC").prop("disabled", true);
    }

}
function getARCCodes() {
    //alert($('.agerelaxtion').filter(':checked').val());
    if ($('.agerelaxtion').filter(':checked').val() == "true") {
       // alert($("#AgeRelaxtion").val());
        $.ajax({
            url: '../RHQSelectionPost/getARCCodes',
            async: false,
            type: "POST",
            dataType: "json",
            contentType: "application/json.; charset=utf-8",
            data: "{adv_No:'" + $("#AdvertisementNo").val() + "', post_No:'" + $("#PostCat_No").val() + "',category:'" + $("#Category").val() + "',gender:'" + $("#Gender").val() + "',PH:'" + $("#PH_Code").val() + "',ExS:'" + $('.Exservice').filter(':checked').val() + "',IsPH:'" + $("#PH").val() + "'}",
            success: function (data) {
                if (data.AgeRelaxationCodes.length != 0) {
                    $("#AgeRelaxtion_Code").html(""); // clear before appending new list 
                    $("#exam_year").append($('<option></option>').val("Please select AgeRelaxation Code").html("Please select AgeRelaxation Code"));
                    $.each(data.AgeRelaxationCodes, function (i, ARC) {
                        $("#AgeRelaxtion_Code").append(
                            $('<option></option>').val(ARC.Value).html(ARC.Text));
                    });

                }
            }
        });
    }
}

function getAllExamYears() {
    debugger;

    $.ajax({
        url: '../AgeRelaxation/getAllExamYears',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{ex_id:'" + $("#ex_id").val() + "'}",
        success: function (data) {
            $("#exam_year").html(""); // clear before appending new list 
            $("#exam_year").append($('<option></option>').val("select any Exam year").html("select any Exam Year"));
            $.each(data.ExamYears, function (i, ExamYear) {
                $("#exam_year").append(
                    $('<option></option>').val(ExamYear.Text).html(ExamYear.Value));
            });
        }
    });
}
function getDepartments() {
    debugger;
    var region_id, state_id, dist_id;

    if ($("select[name='region_id'] option:selected").index() == 0) {
        region_id = -1;
    }
    else {
        region_id = $("#regionChange").val();
    }
    if ($("select[name='state_id'] option:selected").index() == 0) {
        state_id = -1;
        dist_id = -1;

    }
    else {
        state_id = $("#state_id").val();
        if ($("select[name='dist_id'] option:selected").index() == 0) {
            dist_id = -1;
        }
        else {
            dist_id = $("#dist_id").val();
        }
    }
    if (region_id == -1 && state_id == -1 && dist_id == -1) {
        $("#error").text("Please select any");
    }
    else {
        $("#error").text("");
        $.ajax({
            url: '../Department/getdepartments',
            async: false,
            type: "POST",
            dataType: "json",
            contentType: "application/json.; charset=utf-8",
            data: "{regionid:'" + region_id + "',stateid:'" + state_id + "',distid:'" + dist_id + "'}",
            success: function (data) {
                $(".tableCnt").css("display", "block");

                $("#depttbl > tbody").empty();
                var tr;
                var item = data.departments;
                for (var i = 0; i < item.length; i++) {
                    tr = $('<tr/>');
                    //tr.append("<td>" + item[i].d_id + "</td>");
                    tr.append("<td>" + item[i].d_dept_code + "</td>");
                    tr.append("<td>" + item[i].d_dept_name + "</td>");
                    tr.append("<td>" + item[i].d_desc + "</td>");
                    tr.append("<td><div class='editIcons text-center'><a class='table-link editicon'  id='edit' href='../Department/EditDepartment?deptid=" + item[i].d_id + "'> <i class='fa fa-edit'></i> <span> Edit</span></a> <a class='table-link editicon trashD'  id='delete' href='../Department/DeleteDepartment?deptid=" + item[i].d_id + "'> <i class='fa fa-times'></i> <span> Delete</span></a></div></td>")
                    $("#depttbl").append(tr);
                }
            }
        });
    }
}

function StateChange() {
    debugger;
    $.ajax({
        url: '../ExamVenue/GetDistricts_ByStateId',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{stateid:'" + $("#stateChange").val() + "'}",
        success: function (data) {
            $("#dist_id").html(""); // clear before appending new list 
            $.each(data.districts, function (i, district) {
                $("#dist_id").append(
                    $('<option></option>').val(district.dist_id).html(district.dist_name));
            });
        }
    });
}

function SubjectsOnBasisOfPost() {
    $.ajax({
        url: '../ApplicationForm/GetSubjects_ByPost',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{postid:'" + $("#ddlSubject").val() + "'}",
        success: function (data) {
            $("#subid1 > tbody").empty();
            $("#subid1").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
            var item = data.Subjects;
            for (var i = 0; i < item.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + item[i].sub_id + "</td>");
                tr.append("<td>" + item[i].sub_code + "</td>");
                //tr.append("<td><div class='editIcons text-center'><a class='table-link editicon'  id='edit' href='../Districts/EditDistrict?distid=" + item[i].sub_id + "'> <i class='fa fa-edit'></i> <span> Edit</span></a><a class='table-link editicon trashD'  id='delete' href='../Districts/DeleteDistrict?distid=" + item[i].sub_id + "'> <i class='fa fa-times'></i> <span> Delete</span></a></div></td>")
                //tr.append("<td><a id='delete' href='/Districts/DeleteDistrict?distid=" + item[i].dist_id + "'>delete</a></td>")
                $("#subid1").append(tr);
            }
        }
    });
}

function getDistrictsByState() {
    debugger;

    $.ajax({
        url: '../Districts/GetDistricts_ByStateId',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{stateid:'" + $("#state_id").val() + "'}",
        success: function (data) {
            $("#Districtstbl > tbody").empty();
            $("#DistrictsList").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
            var item = data.districts;
            for (var i = 0; i < item.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + item[i].dist_id + "</td>");
                tr.append("<td>" + item[i].dist_name + "</td>");
                tr.append("<td>" + item[i].dist_desc + "</td>");
                tr.append("<td><div class='editIcons text-center'><a class='table-link editicon'  id='edit' href='../Districts/EditDistrict?distid=" + item[i].dist_id + "'> <i class='fa fa-edit'></i> <span> Edit</span></a><a class='table-link editicon trashD'  id='delete' href='../Districts/DeleteDistrict?distid=" + item[i].dist_id + "'> <i class='fa fa-times'></i> <span> Delete</span></a></div></td>")
                //tr.append("<td><a id='delete' href='/Districts/DeleteDistrict?distid=" + item[i].dist_id + "'>delete</a></td>")
                $("#Districtstbl").append(tr);
            }
        }
    });
}

function getStatesByRegion() {
    debugger;

    $.ajax({
        url: '../States/GetStates_ByRegionId',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{regionid:'" + $("#regionChange").val() + "'}",
        success: function (data) {
            $("#Statestbl > tbody").empty();
            $("#StatesList").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
            var item = data.states;
            for (var i = 0; i < item.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + item[i].state_id + "</td>");
                tr.append("<td>" + item[i].state_name + "</td>");
                tr.append("<td>" + item[i].state_desc + "</td>");
                tr.append("<td><div class='editIcons text-center'><a class='table-link editicon' id='edit' href='../States/EditState?stateid=" + item[i].state_id + "'> <i class='fa fa-edit' ></i> <span> Edit</span></a> <a class='table-link editicon trashD' id='delete' href='../States/DeleteState?stateid=" + item[i].state_id + "'> <i class='fa fa-edit' ></i> <span> Delete</span></a></div></td>")

                $("#Statestbl").append(tr);
            }
        }
    });
}


function getStatesListByRegion() {
    debugger;
    var regionId = $("#regionChange").val();
    if ($("#regionChange").val() == "" || $("#regionChange").val() == "undefined") {
        regionId = -1;

    }
    $.ajax({
        url: '../ExamCenter/GetStates_ByRegionId',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{regionid:'" + regionId + "'}",
        success: function (data) {

            $("#state_id").html(""); // clear before appending new list 
            $("#state_id").append($('<option></option>').val("select any state").html("select any state"));
            $.each(data.states, function (i, state) {
                $("#state_id").append(
                    $('<option></option>').val(state.state_id).html(state.state_name));
            });
        }
    });
}
function getDistrictsListByState() {
    debugger;

    $.ajax({
        url: '/Districts/GetDistricts_ByStateId',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{stateid:'" + $("#state_id").val() + "'}",
        success: function (data) {
            $("#dist_id").html(""); // clear before appending new list 
            $("#dist_id").append($('<option></option>').val("select any district").html("select any district"));
            $.each(data.districts, function (i, district) {
                $("#dist_id").append(
                    $('<option></option>').val(district.dist_id).html(district.dist_name));
            });
        }
    });
}

function getDistrictsListByStateId() {
    debugger;

    $.ajax({
        url: '../ExamCenter/GetDistricts_ByStateId',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{stateid:'" + $("#state_id").val() + "'}",
        success: function (data) {
            $("#dist_id").html(""); // clear before appending new list 
            $("#dist_id").append($('<option></option>').val("select any district").html("select any district"));
            $.each(data.districts, function (i, district) {
                $("#dist_id").append(
                    $('<option></option>').val(district.dist_id).html(district.dist_name));
            });
        }
    });
}
function getCentersListByDistrict() {
    debugger;

    $.ajax({
        url: '../ExamVenue/getCentersByDistrict',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{distid:'" + $("#dist_id").val() + "'}",
        success: function (data) {
            debugger;
            $("#ec_id").html(""); // clear before appending new list 
            $("#ec_id").append($('<option></option>').val("select any Center").html("select any Center"));
            $.each(data.ExamCenters, function (i, ExamCenter) {
                $("#ec_id").append(
                    $('<option></option>').val(ExamCenter.ec_id).html(ExamCenter.ec_center_name));
            });
        }
    });
}

function getExamCentersByRegion() {
    debugger;
    var regionid;
    if ($("#region_id").val() == "") {
        regionid = -1;
    }
    else {
        regionid = $("#region_id").val();
       // alert(regionid);
    }
    //var region_id, state_id, dist_id;

    //if ($("select[name='region_id'] option:selected").index() == 0) {
    //    region_id = -1;
    //}
    //else {
    //    region_id = $("#regionChange").val();
    //}
    //if ($("select[name='state_id'] option:selected").index() == 0) {
    //    state_id = -1;
    //    dist_id = -1;

    //}
    //else {
    //    state_id = $("#state_id").val();
    //    if ($("select[name='dist_id'] option:selected").index() == 0) {
    //        dist_id = -1;
    //    }
    //    else {
    //        dist_id = $("#dist_id").val();
    //    }
    //}
    //if (region_id == -1 && state_id == -1 && dist_id == -1) {
    //    $("#error").text("Please select any");
    //}
    //else {
    //    $("#error").text("");

        extable = $("#ExamCenters").dataTable();
        extable.fnDestroy();

        $.ajax({
            url: '../ExamCenter/getExamCenters',
            async: false,
            type: "POST",
            dataType: "json",
            contentType: "application/json.; charset=utf-8",
            data: "{regionid:'" + regionid + "',stateid:'" + -1 + "',distid:'" + -1 + "'}",

            success: function (data) {
                $("#ExamCenters > tbody").empty();
                $("#ExamCentersList").css("display", "block");
                $(".tableCnt").css("display", "block");
                var tr;
                var item = data.ExamCenters;
                for (var i = 0; i < item.length; i++) {
                    tr = $('<tr/>');
                    //tr.append("<td>" + item[i].ec_id + "</td>");
                    tr.append("<td>" + item[i].ec_code + "</td>");
                    tr.append("<td>" + item[i].ec_center_name + "</td>");
                    tr.append("<td>" + item[i].ec_desc + "</td>");
                    tr.append("<td> <div class='editIcons text-center'> <a id='edit' class='table-link editicon' href='../ExamCenter/EditExamCenter?ec_id=" + item[i].ec_id + "'> <i class='fa fa-edit' aria-hidden='true'></i> <span> Edit</span></a> <a id='delete' class='table-link editicon trashD' href='../ExamCenter/DeleteExamCenter?ec_id=" + item[i].ec_id + "'> <i class='fa fa-times' aria-hidden='true'></i> <span> Delete</span></a></div></td>")
                    $("#ExamCenters").append(tr);
                }
                $('#ExamCenters').DataTable({
                    "dom": '<"top">lrt<"bottom"ip><"clear">',
                    "ordering": false,
                    language: {
                        paginate: {
                            next: '<i class="fa fa-angle-double-right" ></i>',
                            previous: '<i class="fa fa-angle-double-left" ></i>'
                        }
                    }
                });
            }
        });
  //  }
}


function getPHSubCategories() {
    debugger;
    var dtid;
    if ($("#dt_id").val() == "") {
        dtid = -1;
    }
    else {
        dtid = $("#dt_id").val();
    }
    phtable = $("#PHSubCategories").dataTable();
    phtable.fnDestroy();

    $.ajax({
        url: '../PH_SubCategory/getSubCategories_DisabilityType',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{dt_id:'" + dtid + "'}",
        success: function (data) {
            $("#PHSubCategories > tbody").empty();
            $("#PHSubCategoryList").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
          
            var item = data.PHSubCategories;
            for (var i = 0; i < item.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + item[i].psc_subcatcode + "</td>");
                tr.append("<td>" + item[i].psc_subcat + "</td>");
                tr.append("<td>" + item[i].dt_disability_type + "</td>");
                tr.append("<td>" + item[i].psc_desc + "</td>");
                tr.append("<td><div class='editIcons text-center'><a class='table-link editicon' id='edit' href='../PH_SubCategory/EditPH_SubCategory?psc_id=" + item[i].psc_id + "'> <i class='fa fa-edit' ></i> <span> Edit</span></a><a class='table-link editicon trashD' id='delete' href='../PH_SubCategory/DeletePH_SubCategory?psc_id=" + item[i].psc_id + "'> <i class='fa fa-times' ></i> <span> Delete</span></a>  </div></td>")
                $("#PHSubCategories").append(tr);
            }
            /* Again Initiate Datatable Function */
            $('#PHSubCategories').DataTable({
                "dom": '<"top">lrt<"bottom"ip><"clear">',
                "ordering": false,
                language: {
                    paginate: {
                        next: '<i class="fa fa-angle-double-right" ></i>',
                        previous: '<i class="fa fa-angle-double-left" ></i>'
        }
                }
    });
}
    });
}


function getPostsByExamID() {
    debugger;
    var exid;
    if ($("#ex_id").val() == "") {
        exid = -1;
    }
    else {
        exid = $("#ex_id").val();
    }
    potable = $("#Poststbl").dataTable();
    potable.fnDestroy();

    $.ajax({
        url: '../Post/getPostsByExam',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{ex_id:'" + exid + "'}",
        success: function (data) {
            $("#Poststbl > tbody").empty();
            //$("#Poststbl > thead").css("display", "block");
            $("#postslist").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
            var item = data.Posts;
            for (var i = 0; i < item.length; i++) {
                tr = $('<tr/>');
                // tr.append("<td>" + item[i].p_id + "</td>");
                tr.append("<td>" + item[i].p_post_code + "</td>");
                tr.append("<td>" + item[i].p_post_name + "</td>");
                tr.append("<td>" + item[i].p_desc + "</td>");
                tr.append("<td><div class='editIcons text-center'><a class='table-link editicon' id='edit' href='../Post/EditPost?p_id=" + item[i].p_id + "' > <i class='fa fa-edit' ></i> <span> Edit</span></a><a class='table-link editicon trashD' id='delete' href='../Post/DeletePost?p_id=" + item[i].p_id + "' > <i class='fa fa-edit' ></i> <span> Delete</span></a></div></td>")

                $("#Poststbl").append(tr);
            }
            $('#Poststbl').DataTable({
                "dom": '<"top">lrt<"bottom"ip><"clear">',
                "ordering": false,
                language: {
                    paginate: {
                        next: '<i class="fa fa-angle-double-right" ></i>',
                        previous: '<i class="fa fa-angle-double-left" ></i>'
                    }
        }
    });
}
    });
}
function getReasonsByProvision() {
    debugger;
    var rpid;
    if ($("#rp_id").val() == "") {
        rpid = -1;
    }
    else {
        rpid = $("#rp_id").val();
    }
    potable = $("#Rejectiontbl").dataTable();
    potable.fnDestroy();
    $.ajax({
        url: '../RejectionReason/getRejec_ReasonsByProvision',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{rp_id:'" + rpid + "'}",
        success: function (data) {
            $("#Rejectiontbl > tbody").empty();
            $("#Rej_ReasonsList").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
            var item = data.Reasons;
            for (var i = 0; i < item.length; i++) {
                tr = $('<tr/>');
                //   tr.append("<td>" + item[i].rr_id + "</td>");
                tr.append("<td>" + item[i].rr_rejectionreasoncode + "</td>");
                tr.append("<td>" + item[i].rr_rejectionreason + "</td>");
                tr.append("<td>" + item[i].rr_desc + "</td>");
                tr.append("<td><div class='editIcons text-center'><a class='table-link editicon' id='edit' href='../RejectionReason/EditRejectionReason?rr_id=" + item[i].rr_id + "'> <i class='fa fa-edit' ></i> <span> Edit</span></a><a class='table-link editicon trashD' id='delete' href='../RejectionReason/DeleteRejectionReason?rr_id=" + item[i].rr_id + "'> <i class='fa fa-edit' ></i> <span> Delete</span></a></div></td>")

                $("#Rejectiontbl").append(tr);
            }
            $('#Rejectiontbl').DataTable({
                "dom": '<"top">lrt<"bottom"ip><"clear">',
                "ordering": false,
                language: {
                    paginate: {
                        next: '<i class="fa fa-angle-double-right" ></i>',
                        previous: '<i class="fa fa-angle-double-left" ></i>'
                    }
                }
            });
        }
    });
}




function getAgeRelaxations() {
    debugger;
    var noid;
    if ($("#Notification_Id").val() == "")
    {
        noid = -1;
    }
    else
    {
        noid = $("#Notification_Id").val();
    }
    potable = $("#AgeRelaxationtbl").dataTable();
    potable.fnDestroy();
    $.ajax({
        url: '../AgeRelaxation/getAgeRelaxation',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{no_id:'" + noid + "'}",

        success: function (data) {
            $("#AgeRelaxationtbl > tbody").empty();
            $("#AgeRelaxationList").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
            var item = data.AgeRelaxations;
            for (var i = 0; i < item.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + item[i].notification_Name + "</td>");
                tr.append("<td>" + item[i].arc_relaxationcode + "</td>");
                tr.append("<td>" + item[i].arc_desc + "</td>");
                tr.append("<td>" + item[i].arc_years + "</td>");
                tr.append("<td>" + item[i].Base_Category_Name + "</td>");
                tr.append("<td>" + item[i].Horizontal_Category_Name + "</td>");
                tr.append("<td>" + item[i].gender_desc + "</td>");
                tr.append("<td>" + item[i].groupB + "</td>");
                tr.append("<td>" + item[i].groupC + "</td>");
                tr.append("<td><div class='editIcons text-center'><a class='table-link editicon' id='edit' href='../AgeRelaxation/EditAgeRelaxation?arc_id=" + item[i].arc_id + "'> <i class='fa fa-edit'></i> <span> Edit</span></a> <a class='table-link editicon trashD' href='../AgeRelaxation/DeleteAgeRelaxation?arc_id=" + item[i].arc_id + "'> <i class='fa fa-times'></i> <span> Delete</span></a></div></td>")
                $("#AgeRelaxationtbl").append(tr);
            }
            $('#AgeRelaxationtbl').DataTable({
                "dom": '<"top">lrt<"bottom"ip><"clear">',
                "ordering": false,
                language: {
                    paginate: {
                        next: '<i class="fa fa-angle-double-right" ></i>',
                        previous: '<i class="fa fa-angle-double-left" ></i>'
                    }
                }
            });
        }
    });

}

function getExamVenuesByDistrict() {
    debugger;
    var region_id, state_id, dist_id, center_id;

    if ($("select[name='region_id'] option:selected").index() == 0) {
        region_id = -1;
    }
    else {
        region_id = $("#regionChange").val();
    }
    if ($("select[name='state_id'] option:selected").index() == 0) {
        state_id = -1;
        dist_id = -1;
        center_id = -1;

    }
    else {
        state_id = $("#state_id").val();
        if ($("select[name='dist_id'] option:selected").index() == 0) {
            dist_id = -1;
            center_id = -1;
        }
        else {
            dist_id = $("#dist_id").val();
            if ($("select[name='ec_id'] option:selected").index() == 0) {
                center_id = -1;
            }
            else {
                center_id = $("#ec_id").val();
            }
        }
    }
    if (region_id == -1 && state_id == -1 && dist_id == -1 && center_id == -1) {
        $("#error").text("Please select any");
    }
    else {
        $("#error").text("");
        debugger;
        $.ajax({
            url: '../ExamVenue/getExamVenues',
            async: false,
            type: "POST",
            dataType: "json",
            contentType: "application/json.; charset=utf-8",
            data: "{regionid:'" + region_id + "',stateid:'" + state_id + "',distid:'" + dist_id + "',centerid:'" + center_id + "'}",

            success: function (data) {
                debugger;
                $("#ExamVenuetbl > tbody").empty();
                $("#ExamVenueList").css("display", "block");
                var tr;
                var item = data.ExamVenues;
                for (var i = 0; i < item.length; i++) {
                    tr = $('<tr/>');
                    tr.append("<td>" + item[i].v_name + "</td>");
                    tr.append("<td>" + item[i].v_desc + "</td>");

                    tr.append("<td>" + item[i].v_seatingcapacity + "</td>");
                    //    tr.append("<td>" + item[i].v_shiftid + "</td>");
                    tr.append("<td>" + item[i].v_venuecode + "</td>");
                    tr.append("<td>" + item[i].v_examname + "</td>");
                    //  tr.append("<td>" + item[i].v_examscheduleid + "</td>");
                    tr.append("<td>" + item[i].v_address + "</td>");
                    tr.append("<td><div class='editIcons text-center'> <a class='table-link editicon' id='edit' href='../ExamVenue/EditVenue?v_id=" + item[i].v_id + "'> <i class='fa fa-edit'></i> <span> Edit</span></a><a class='table-link editicon trashD' id='delete' href='../ExamVenue/DeleteExamVenue?v_id=" + item[i].v_id + "'> <i class='fa fa-times'></i> <span> Delete</span></a></div></td>")

                    $("#ExamVenuetbl").append(tr);
                }
            }
        });
    }
}

function getOrganizationsByDept() {
    debugger;
    var did;
    if ($("#d_id").val() == "") {
        did = -1;
    }
    else {
        did = $("#d_id").val();
    }
    ottable = $("#Organizationtbl").dataTable();
    ottable.fnDestroy();
    $.ajax({
        url: '../Organization/GetOrganizations_ByDeptId',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{dept_Id:'" + did + "'}",
        success: function (data) {
            $("#Organizationtbl > tbody").empty();
            //$("#StatesList").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
            var item = data.organizations;
            for (var i = 0; i < item.length; i++) {
                tr = $('<tr/>');
                //tr.append("<td>" + item[i].org_Id + "</td>");
                tr.append("<td>" + item[i].org_code + "</td>");
                tr.append("<td>" + item[i].org_name + "</td>");
                tr.append("<td>" + item[i].org_desc + "</td>");
                tr.append("<td><div class='editIcons text-center'><a class='table-link editicon' id='edit' href='../Organization/EditOrganization?org_Id=" + item[i].org_Id + "'> <i class='fa fa-edit' ></i> <span> Edit</span></a> <a class='table-link editicon trashD' id='delete' href='../Organization/DeleteOrganization?org_Id=" + item[i].org_Id + "'> <i class='fa fa-times' ></i> <span> Delete</span></a> </div></td>")
                $("#Organizationtbl").append(tr);
            }
            $('#Organizationtbl').DataTable({
                "dom": '<"top">lrt<"bottom"ip><"clear">',
                "ordering": false,
                language: {
                    paginate: {
                        next: '<i class="fa fa-angle-double-right" ></i>',
                        previous: '<i class="fa fa-angle-double-left" ></i>'
        }
                }
    });
}
    });
}

function getExamYear() {
    $.ajax({
        url: '../AgeRelaxation/getExamYear',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{examId:'" + $("#ExamName").val() + "'}",
        success: function (data) {

            $("#exam_year").val(data.ExamYear);
            //$("#ExamYear").html(""); // clear before appending new list 
            //$("#ExamYear").append($('<option></option>').val("select any Exam Year").html("select any Exam Year"));
            //$.each(data.ExamYears, function (i, ExamYear) {
            //    $("#ExamYear").append(
            //        $('<option></option>').val(ExamYear.ex_id).html(ExamYear.exam_year));
            //});
        }
    });
}


//RHQ Selection Post
function getDistrictsListByState() {
    debugger;

    $.ajax({
        url: '../RHQSelectionPost/GetDistrictsList',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{stateid:'" + $("#State").val() + "'}",
        success: function (data) {
            $("#District").html(""); // clear before appending new list 
            $("#District").append($('<option></option>').val("select any district").html("select any district"));
            $.each(data.DistrictsList, function (i, district) {
                $("#District").append(
                    $('<option></option>').val(district.Value).html(district.Text));
            });
        }
    });
}
function getDistrictsListByStateEV() {
    debugger;

    $.ajax({
        url: '../ExamCenter/GetDistricts_ByStateId',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{stateid:'" + $("#state_id").val() + "'}",
        success: function (data) {
            debugger;
            $("#dist_id").html(""); // clear before appending new list 
            $("#dist_id").append($('<option></option>').val("select any district").html("select any district"));
            $.each(data.districts, function (i, district) {
                $("#dist_id").append(
                    $('<option></option>').val(district.dist_id).html(district.dist_name));
            });
        }
    });
}
function getPostsByAdvertisement() {
    debugger;

    $.ajax({
        url: '../RHQSelectionPost/PostsCatList',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{adv_No:'" + $("#AdvertisementNo").val() + "',category:'" + $("#Category").val() + "', DOB:'" + $("#DOB").val() + "'}",
        success: function (data) {
            $("#Age").val(data.Age);
            $("#PostCat_No").html(""); // clear before appending new list 
            $("#PostCat_No").append($('<option></option>').html("please select Post Cat Number"));
            $.each(data.PostsList, function (i, post) {
                $("#PostCat_No").append(

                $('<option></option>').val(post.Value).html(post.Text));
            });
            $.each(data.AgeRelaxationCodes, function (i, ARCCode) {
                $("#AgeRelaxtion_Code").append(

                $('<option></option>').val(ARCCode.Value).html(ARCCode.Text));
            });
        }
    });
}





function getCourses_ByPost() {
    debugger;
    $('#educationdata_table tbody>tr:not(:first-child)').remove();
    $('#educationdata_table tbody tr .subject').empty();
    $(".Error_Coursename").empty();
    $(".Error_Marks").empty();
    $(".Error_Subject").empty();
    $(".Error_Medium").empty();

    $.ajax({
        url: '../RHQSelectionPost/CoursesList',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{adv_No:'" + $("#AdvertisementNo").val() + "', post_No:'" + $("#PostCat_No").val() + "',pwd:'" + $("#PH_Code").val() + "'}",//,category:'" + $("#Category").val() + "',gender:'" + $("#Gender").val() + "',PH:'" + $("#PH_Code").val() + "',ExS:'" + $("#ExService").val() + "',IsPH:'" + $("#PH").val() + "'}",
        success: function (data) {
            if (data.Message == "") {
                $("#PostName").html(""); // clear before appending new value
                $("#PostName").val(data.PostName);
                $("#Course_Id").html(""); // clear before appending new list
                $("#Course_Id").append($('<option></option>').val("").html("select Course"));
                $.each(data.CoursesList, function (i, course) {
                    $("#Course_Id").append(
                        $('<option></option>').val(course.Value).html(course.Text));
                });
                $("#Subject_Id").html("");
                $("#Subject_Id").append($('<option></option>').val("").html("select Subject"));

                $.each(data.SubjectsList, function (i, subject) {
                    $("#Subject_Id").append(
                        $('<option></option>').val(subject.Value).html(subject.Text));
                });
                //$.each(data.AgeRelaxationCodes, function (i, ARC) {
                //    $("#AgeRelaxtion_Code").append(
                //    $('<option></option>').val(ARC.Value).html(ARC.Text));
                //});

            }
            else if (data.Message == "ReApply") {
                $('#postReApply').show();
            }
            else if(data.Message == "Not Suitable")
            {
                $('#postNotSuitable').show();
            }
            else{}
        }
    });
}


//$(document).ready(function () {
//    $('.course_name').change(function () {
//        var value = $(this).parent().siblings().children(".subject");
//        $.ajax({
//            url: '/ScrutinyReport/SubjectsList',
//            async: false,
//            type: "POST",
//            dataType: "json",
//            contentType: "application/json.; charset=utf-8",

//            data: "{adv_No:'" + $("#AdvertisementNo").val() + "', post_No:'" + $("#PostCat_No").val() + "', eq_Id:'" + $(this).find('option:selected').val() + "'}",
//            success: function (data) {
//                value.empty(""); // clear before appending new list 
//                value.append($('<option></option>').val("select Subject").html("select Subject"));
//                $.each(data.SubjectsList, function (i, subject) {
//                    value.append(
//                        $('<option></option>').val(subject.qsb_id).html(subject.qsb_subject));
//                });
//            }
//        });

//    });
//});

function getAdvertisements_ByYear() {
    debugger;

    $.ajax({
        url: '../RHQSelectionPost/Get_AdvertisementNumbers',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",

        data: "{adv_Year:'" + $("#AdvYear").val() + "'}",
        success: function (data) {

            $("#AdvertisementNo").html(""); // clear before appending new list 
            $("#AdvertisementNo").append($('<option></option>').val("select Advertisement Number").html("select Advertisement Number"));
            $.each(data.AdvertisemtsList, function (i, Advertisemt) {
                $("#AdvertisementNo").append(
                    $('<option></option>').val(Advertisemt.Value).html(Advertisemt.Text));
            });


        }
    });
}

function getPosts_ByAdvertisement() {
    debugger;

    $.ajax({
        url: '../RHQSelectionPost/Get_PostNumbers',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{adv_No:'" + $("#AdvertisementNo").val() + "'}",
        success: function (data) {

            $("#PostCode").html(""); // clear before appending new list 
            $("#PostCode").append($('<option></option>').html("please select Post Number"));
            $.each(data.PostsList, function (i, post) {
                $("#PostCode").append(

                $('<option></option>').val(post.Value).html(post.Text));
            });
        }
    });
}


function getRegionwise_Centers() {
    debugger;

    $.ajax({
        url: '../RHQSelectionPost/Get_Regionwise_Centers',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{ec_id:'" + $("#Centercode1").val() + "'}",
        success: function (data) {

            $("#Centercode2").html(""); // clear before appending new list 
            $("#Centercode3").html("");
            $("#Centercode2").append($('<option></option>').html("Center 2"));
            $("#Centercode3").append($('<option></option>').html("Center 3"));
            $.each(data.CenterCodesList, function (i, center) {
                $("#Centercode2").append(

                $('<option></option>').val(center.Value).html(center.Text));
                $("#Centercode3").append(

              $('<option></option>').val(center.Value).html(center.Text));
            });

        }
    });
}

function delete_row(no) {
    document.getElementById("row" + no + "").outerHTML = "";
}

function add_row() {

    var course_name = $("#course_name").text();

    //$("#course_name").append($('<option></option>').val("select Course").html("select Course"));
    //$.each(data.CoursesList, function (i, course) {
    //    $("#course_name").append(
    //        $('<option></option>').val(course.Value).html(course.Text));
    //});




    var marks = document.getElementById("marks").value;
    var subject = $("#subject option:selected").text();
    var medium = $("#medium option:selected").text();

    var table = document.getElementById("data_table");
    var table_len = (table.rows.length) - 1;
    var row = table.insertRow(table_len).outerHTML = "<tr id='row" + table_len + "'><td id='course_name_row" + table_len + "'> <select  id='course_name' class='form-control course_name' onchange='getSubjects_ByPost_Qualification()'><option>" + course_name + "</option></select></td><td id='marks_row" + table_len + "'><input type='text' value='" + marks + "' class='form-control marks'> </td><td id='subject_row" + table_len + "'><select  class='form-control subject'><option>" + subject + "</option></select> </td> <td id='medium_row" + table_len + "'> <select  id='medium' class='form-control medium'><option>" + medium + "</option></select> </td><td> <input type='button' value='Delete' class='delete btn btn-warning' onclick='delete_row(" + table_len + ")'></td></tr>";

    document.getElementById("course_name").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("medium").value = "";


}


function delete_exprow(no) {
    document.getElementById("exprow" + no + "").outerHTML = "";
}

function add_exprow() {
    var organization = document.getElementById("organization").value;
    var designation = document.getElementById("designation").value;
    var duty_nature = document.getElementById("duty_nature").value;
    var service_from = document.getElementById("service_from").value;
    var service_to = document.getElementById("service_to").value;

    var table1 = document.getElementById("wrkexp_table");
    var table_explen = (table1.rows.length) - 1;
    var exprow = table1.insertRow(table_explen).outerHTML = "<tr id='exprow" + table_explen + "'><td id='organization_row" + table_explen + "'> <input type='text' value='" + organization + "' class='form-control'></td><td id='designation_row" + table_explen + "'><input type='text' value='" + designation + "' class='form-control'> </td><td id='duty_nature_row" + table_explen + "'> <input type='text' value='" + duty_nature + "' class='form-control'> </td> <td id='service_from_row" + table_explen + "'><input type='text' value='" + service_from + "' class='form-control'> </td> <td id='service_to_row" + table_explen + "'><input type='text' value='" + service_to + "' class='form-control'> </td><td> <input type='button' value='Delete' class='delete btn btn-warning' onclick='delete_exprow(" + table_explen + ")'></td></tr>";

    document.getElementById("organization").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("duty_nature").value = "";
    document.getElementById("service_from").value = "";
    document.getElementById("service_to").value = "";
}





//scrutiny report
function get_Shortlisted_Candidates() {
    debugger;

    $.ajax({
        url: '../RHQSelectionPost/CandidateList',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{PostYear:'" + $("#AdvYear").val() + "',AdvertisementNo:'" + $("#AdvertisementNo").val() + "',PostCode:'" + $("#PostCode").val() + "'}",
        success: function (data) {
            $("#threjected").css("display", "none");
            $("#Candidatestbl > tbody").empty();
            //$("#StatesList").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
            var item = data.CandidatesList;
            var slno = 1;
            for (var i = 0; i < item.length; i++) {
                var DOBString = item[i].DOB.substr(6);
                var Date1 = new Date(parseInt(DOBString));
                var month = Date1.getMonth() + 1;
                var day = Date1.getDate();
                var year = Date1.getFullYear();
                var DOB = day + "/" + month + "/" + year;
                tr = $('<tr/>');
                tr.append("<td>" + slno + "</td>");
                tr.append("<td>" + item[i].RollNo + "</td>");
                tr.append("<td>" + item[i].RegNo + "</td>");
                tr.append("<td>" + item[i].CandidateName + "</td>");
                tr.append("<td>" + DOB + "</td>");
                tr.append("<td>" + item[i].Age + "</td>");
                tr.append("<td>" + item[i].Sex + "</td>");
                tr.append("<td>" + item[i].Category + "</td>");
                tr.append("<td>" + item[i].Marks + "</td>");
                $("#Candidatestbl").append(tr);
                slno++;
            }
        }
    });
}

function get_Rejectedlisted_Candidates() {
    debugger;

    $.ajax({
        url: '../RHQSelectionPost/RejectedCandidateList',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{PostYear:'" + $("#AdvYear").val() + "',AdvertisementNo:'" + $("#AdvertisementNo").val() + "',PostCode:'" + $("#PostCode").val() + "'}",
        success: function (data) {            
            $("#threjected").css("display", "block");
            $("#Candidatestbl > tbody").empty();
            //$("#StatesList").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;
            var item = data.CandidatesList;
            var slno = 1;
            for (var i = 0; i < item.length; i++) {
                var DOBString = item[i].DOB.substr(6);
                var Date1 = new Date(parseInt(DOBString));
                var month = Date1.getMonth() + 1;
                var day = Date1.getDate();
                var year = Date1.getFullYear();
                var DOB = day + "/" + month + "/" + year;
                tr = $('<tr/>');
                tr.append("<td>" + slno + "</td>");
                tr.append("<td>" + item[i].RollNo + "</td>");
                tr.append("<td>" + item[i].RegNo + "</td>");
                tr.append("<td>" + item[i].CandidateName + "</td>");
                tr.append("<td>" + DOB + "</td>");
                tr.append("<td>" + item[i].Age + "</td>");
                tr.append("<td>" + item[i].Sex + "</td>");
                tr.append("<td>" + item[i].Category + "</td>");
                tr.append("<td>" + item[i].Marks + "</td>");
                tr.append("<td>" + item[i].reject_reason + "</td>");
                $("#Candidatestbl").append(tr);
                slno++;
            }
        }
    });
}
//end of scrutiny
//RHQ Selection Post End



//Payment Gateway

function get_EreceiptDetails() {
    debugger;
    $(".tableCnt").css("display", "block");
    $.ajax({
        url: '../Payment/Get_E_receiptDetails',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{examId:'" + $("#ExamId").val() + "'}",
        success: function (data) {
            $(".tableCnt").css("display", "block");
            $('.ereceipt').show();

            var tr;
            tr = $('<tbody>');
            tr.append("<tr><th>Account No</th><td>" + data.AccountNumber + "</td></tr>");
            tr.append("<tr><th>State Bank of India</th><td>" + data.SBI_Branch + "</td></tr>");
            tr.append("<tr><th>Registration Number</th><td>" + data.Registration_Number + "</td></tr>");
            tr.append("<tr><th>Transaction Id</th><td>" + data.Transaction_Id + "</td></tr>");
            tr.append("<tr><th>Reference Id</th><td>" + data.Reference_Id + "</td></tr>");
            tr.append("<tr><th>Date of Transaction</th><td>" + data.Transaction_Date + "</td></tr>");
            tr.append("<tr><th>Transaction Amount(Rs.)</th><td>" + data.Transaction_Amt + "</td></tr>");
            tr.append("<tr><th>Transaction Status</th><td>" + data.Transaction_Status + "</td></tr>");
            $("#Ereceipttbl").append(tr);
        }
    });
}

function printReceipt() {
    debugger;
    var divToPrint = document.getElementById("ereceipt");
    var newWin = window.open("");
    newWin.document.write('<head>');
    newWin.document.write('<style>#divPrint {text-align: center; width: 100%;} .table{width:60%; text-align:left; margin:0px auto; border:1px solid #ddd; border-bottom:0px; } th{border-bottom:1px solid #ddd; border-right:1px solid #ddd; padding:5px 10px;} td{ border-bottom:1px solid #ddd;padding:5px 10px } thead th{ text-align:center; border-right:0px; } h1 { font-size:25px;text-align: center; }</style>');
    newWin.document.write('</head>');
    newWin.document.write('<h1><b>Staff Selection Commission</b></h1>');
    newWin.document.write(divToPrint.outerHTML);

    newWin.print();
}
//PaymentGateway - end



function onIndexCategoryChanged() {
    debugger;
    if ($.trim($("#CategoryId").val() != ""))
    {
        $("#lblCategoryErrMsg").html("");
        return true;
    }

}
function onIndexLanguageChanged() {
    debugger;
    if ($.trim($("#Language").val() != ""))
    {
        $("#lblLanguageErrMsg").html("");
        return true;
    }

}
//upload portal documents
function getDocumentsList() {
    debugger;
    var dotable; 
    var isvalid = true;
    if ($.trim($("#CategoryId").val()) == "") {
        $("#lblCategoryErrMsg").html("Please select category");
        isvalid= false;
    }
    if ($.trim($("#Language").val()) == "") {
        $("#lblLanguageErrMsg").html("Please select language");
        isvalid = false;
    }
    if (isvalid == false) {
        return false;
    }
    $.ajax({
        url: '../UploadDoc/GetDocuments_ByCategory',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{categoryId:'" + $("#CategoryId").val() + "',language:'" + $("#Language").val() + "'}",
        success: function (data) {
            

            $("#Documenttbl > tbody").empty();
            $("#Documenttbl > thead").empty();
            $("#DocumentsList").css("display", "block");
            $(".tableCnt").css("display", "block");
            var tr;

            var item = data.DocumentsList;     
            tr = $('<tr/>');
            tr.append("<th>S.No</th>")
            if (item[0].StartDate != "")
                tr.append("<th> StartDate </th>");
            if (item[0].EndDate != "")
                tr.append("<th> EndDate </th>");
            if (item[0].ExamName != "")
                tr.append("<th> Exam </th>");
            var StartdateString = item[0].Date.substr(6);
            var Date1 = new Date(parseInt(StartdateString));
            var month = Date1.getMonth() + 1;
            var day = Date1.getDate();
            var year = Date1.getFullYear();
            var date = day + "/" + month + "/" + year;
            if (date != "1/1/1")
                tr.append("<th> Date </th>");
            if (item[0].HeadingText != "")
                tr.append("<th>  Heading Text </th>");       
            if (item[0].file != "")
                tr.append("<th> File </th>");           
            if (item[0].Notice_Doc != "")
                tr.append("<th>    Notice File </th>");          
            if (item[0].Form_Doc != "" || item[0].Notice_Doc != "")
                tr.append("<th>   Form File </th>");       
            if (item[0].WriteUp_Doc != "")
                tr.append("<th>    Writeup File</th>");           
            if (item[0].Result_Doc != "")
                tr.append("<th>  Result File </th>");         
            if (item[0].Marks_Doc != "")
                tr.append("<th>    Marks File </th>");        
            tr.append("<th class='text-center'>   Action </th>");
            $("#Documenttbl > thead ").append(tr);


            var count = 1;
            for (var i = 0; i < item.length; i++) {
                var StartdateString = item[i].StartDate.substr(6);
                var Date1 = new Date(parseInt(StartdateString));
                var month = Date1.getMonth() + 1;
                var day = Date1.getDate();
                var year = Date1.getFullYear();
                var Startdate = day + "/" + month + "/" + year;

                var EnddateString = item[i].EndDate.substr(6);
                var Date2 = new Date(parseInt(EnddateString));
                var month = Date2.getMonth() + 1;
                var day = Date2.getDate();
                var year = Date2.getFullYear();
                var Enddate = day + "/" + month + "/" + year;

                var dateString = item[i].Date.substr(6);
                var Date3 = new Date(parseInt(dateString));
                var month = Date3.getMonth() + 1;
                var day = Date3.getDate();
                var year = Date3.getFullYear();
                var date = day + "/" + month + "/" + year;
                tr = $('<tr/>');
                tr.append("<td>" + count++ + "</td>")
                tr.append("<td>" + Startdate + "</td>");
                tr.append("<td>" + Enddate + "</td>");
                if (item[i].ExamName != "")
                    tr.append("<td>" + item[i].ExamName + "</td>");
                if (date != "1/1/1")
                    tr.append("<td>" + date + "</td>");
                if (item[i].HeadingText != "")
                    tr.append("<td>" + item[i].HeadingText + "</td>");            
                if (item[i].file != "")
                    tr.append("<td>" + item[i].file + "</td>");              
                if (item[i].Notice_Doc != "")
                    tr.append("<td>" + item[i].Notice_Doc + "</td>");            
                if (item[i].Form_Doc != "" || item[i].Notice_Doc != "")
                    tr.append("<td>" + item[i].Form_Doc + "</td>");            
                if (item[i].WriteUp_Doc != "")
                    tr.append("<td>" + item[i].WriteUp_Doc + "</td>");             
                if (item[i].Result_Doc != "")
                    tr.append("<td>" + item[i].Result_Doc + "</td>");         
                if (item[i].Marks_Doc != "")
                    tr.append("<td>" + item[i].Marks_Doc + "</td>");
            

                tr.append("<td><div class='editIcons text-center'><a class='table-link editicon trashD'  id='delete' href='../UploadDoc/DeleteDocument?docId=" + item[i].DocId + "'> <i class='fa fa-times'></i> <span> Delete</span></a></div></td>")

                
                $("#Documenttbl tbody").append(tr);
                
            }

            /* Initialize after ajax call */
            
            $('#Documenttbl').DataTable({
                destroy: true,
                "dom": '<"top">lrt<"bottom"ip><"clear">',
                "ordering": false,
                language: {
                    paginate: {
                        next: '<i class="fa fa-angle-double-right" ></i>',
                        previous: '<i class="fa fa-angle-double-left" ></i>'
                    }
            }
            });
        }
    });
}


function onCategoryChanged() {
    debugger;

    var category = $("#CategoryId").val();
    if (category == 3) //notices - 3 is categoryId
    {
        $(".divUploadError").css("display", "none");
        $(".Exam").css("display", "block");
        $(".Date").css("display", "block");
        $(".Startdate").css("display", "block");
        $(".Enddate").css("display", "block");
        $(".EngNotice").css("display", "block");
        $(".EngForm").css("display", "block");    
        $(".EngHeading").css("display", "block");  
        $(".Note").css("display", "block");  
        $(".EngNormal").css("display", "none"); 
        $(".EngWriteUp").css("display", "none");
        $(".EngResult").css("display", "none");
        $(".EngMarks").css("display", "none");
        $("#IsLatestNews").prop("disabled", false);
        $("#IsLatestNews").prop('checked', false);
        $(".IsRedirectOnly").css("display", "block");
   
        ExamsList();

    }

    else if (category == 7) { //result - 7 is category Id
        $(".divUploadError").css("display", "block");
        $(".Exam").css("display", "block");
        $(".Date").css("display", "block");
        $(".Startdate").css("display", "block");
        $(".Enddate").css("display", "block");
        $(".EngWriteUp").css("display", "block");
        $(".EngResult").css("display", "block");
        $(".EngMarks").css("display", "block");      
        $(".EngHeading").css("display", "block");      
        $(".Note").css("display", "block");
        $(".EngNormal").css("display", "none");     
        $(".EngNotice").css("display", "none");
        $(".EngForm").css("display", "none");
        $("#IsLatestNews").prop("disabled", false);
        $("#IsLatestNews").prop('checked', false);
        $(".IsRedirectOnly").css("display", "block");
        ExamsList();

    }

    else if (category == 10) { //Tentative Vancancy - 10 is category Id
        $(".divUploadError").css("display", "none");
        $(".Exam").css("display", "block");
        $(".EngNormal").css("display", "block");  
        $(".Startdate").css("display", "block");
        $(".Enddate").css("display", "block");
        $(".EngHeading").css("display", "block");     
        $(".Note").css("display", "block");
        $(".EngWriteUp").css("display", "none");
        $(".EngResult").css("display", "none");
        $(".EngMarks").css("display", "none");    
        $(".EngNotice").css("display", "none");
        $(".EngForm").css("display", "none");
        $("#IsLatestNews").prop("disabled", false);
        $("#IsLatestNews").prop('checked', false);
        $(".IsRedirectOnly").css("display", "none");
        ExamsList();

    }
    else if (category == 4) //Examination Calendar - 4 is categoryId
    {
        $(".divUploadError").css("display", "none");
        $(".EngNormal").css("display", "block");   
        $(".Note").css("display", "none");
        $(".EngHeading").css("display", "none");
        $(".Startdate").css("display", "none");
        $(".Enddate").css("display", "none");
        $(".EngNotice").css("display", "none");
        $(".EngForm").css("display", "none");   
        $(".EngWriteUp").css("display", "none");
        $(".EngResult").css("display", "none");
        $(".EngMarks").css("display", "none");  
        $(".Exam").css("display", "none");
        $(".Date").css("display", "none");
        $("#IsLatestNews").prop("disabled", true);
        $(".IsRedirectOnly").css("display", "none");
   
    }
    else if (category == 9) //debarred
    {
        $(".divUploadError").css("display", "none");
        $(".EngNormal").css("display", "block");
        $(".Note").css("display", "none");
        $(".EngHeading").css("display", "none");    
        $(".Startdate").css("display", "none");
        $(".Enddate").css("display", "none");     
        $(".EngNotice").css("display", "none");
        $(".EngForm").css("display", "none");   
        $(".EngWriteUp").css("display", "none");
        $(".EngResult").css("display", "none");
        $(".EngMarks").css("display", "none");
        $(".Exam").css("display", "none");
        $(".Date").css("display", "none");
        $("#IsLatestNews").prop("disabled", true);
        $(".IsRedirectOnly").css("display", "none");
    }
    else if(category==1)//latest news
    {
        $(".divUploadError").css("display", "none");
        $("#IsLatestNews").prop('checked', true);
        $("#IsLatestNews").prop("disabled", true);
        $(".IsRedirectOnly").css("display", "none");
    }
    else if(category == 8)
    {
        $(".divUploadError").css("display", "none");
        $(".EngNormal").css("display", "block");
        $(".Startdate").css("display", "block");
        $(".Enddate").css("display", "block");
        $(".EngHeading").css("display", "block");
        $(".Note").css("display", "block");
        $(".EngNotice").css("display", "none");
        $(".EngForm").css("display", "none");
        $(".EngWriteUp").css("display", "none");
        $(".EngResult").css("display", "none");
        $(".EngMarks").css("display", "none");
        $(".Exam").css("display", "none");
        $(".Date").css("display", "none");
        $("#IsLatestNews").prop("disabled", false);
        $("#IsLatestNews").prop('checked', false);
        $(".IsRedirectOnly").css("display", "block");
    }
    else { //others
        $(".divUploadError").css("display", "none");
        $(".EngNormal").css("display", "block");    
        $(".Startdate").css("display", "block");
        $(".Enddate").css("display", "block");
        $(".EngHeading").css("display", "block");   
        $(".Note").css("display", "block");
        $(".EngNotice").css("display", "none");
        $(".EngForm").css("display", "none");   
        $(".EngWriteUp").css("display", "none");
        $(".EngResult").css("display", "none");
        $(".EngMarks").css("display", "none");    
        $(".Exam").css("display", "none");
        $(".Date").css("display", "none");
        $("#IsLatestNews").prop("disabled", false);
        $("#IsLatestNews").prop('checked', false);
        $(".IsRedirectOnly").css("display", "none");
    }

}

function ExamsList() {
    $.ajax({
        url: '../UploadDoc/GetExamsList',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        success: function (data) {

            $("#Exam").html(""); // clear before appending new list 
            $("#Exam").append($('<option></option>').val(0).html("please select Exam"));
            $.each(data.ExamsList, function (i, Exam) {
                $("#Exam").append(
                    $('<option></option>').val(Exam.Value).html(Exam.Text));
            });

        }
    });
}
//upload portal documents -end


//Candidate portal
function getPostNamesByAdvertisement() {
    debugger;

    $.ajax({
        url: '../RHQSelectionPost/PostsList',
        async: false,
        type: "POST",
        dataType: "json",
        contentType: "application/json.; charset=utf-8",
        data: "{adv_No:'" + $("#AdvertisementNo").val() + "'}",
        success: function (data) {

            $("#PostCat_No").html(""); // clear before appending new list 
            $("#PostCat_No").append($('<option></option>').html("please select Post Cat Number"));
            $.each(data.PostsList, function (i, post) {
                $("#PostCat_No").append(

                $('<option></option>').val(post.Value).html(post.Text));
            });

        }
    });
}

function redirect_Print() {
    var advId = $("#AdvertisementNo option:selected").val();
    var postNo = $("#PostCat_No option:selected").val();
    var notificationId = $(".notId").text();
    window.open("../ApplicationForm/DraftPrint_RHQ?advId=" + advId + "&postNo=" + postNo, '_blank');
    //  window.location.href = "/ApplicationForm/DraftPrint_RHQ?advId=" + advId + "&postNo=" + postNo;

}
function redirect_download_offlinechallan() {
    var advId = $("#AdvertisementNo option:selected").val();
    var postNo = $("#PostCat_No option:selected").val();
    var notificationId = $(".notId").text();
    window.location.href = "../ChallanGeneration/challan_download?notificationid=" + notificationId + "&examId=8&advId=" + advId + "&postNo=" + postNo;

}
function redirect_Payment() {
    var advId = $("#AdvertisementNo option:selected").val();
    var postNo = $("#PostCat_No option:selected").val();
    var notificationId = $(".notId").text();
    window.location.href = "../ApplicationForm/Payment_rhq?notificationid=" + notificationId + "&examId=8&advId=" + advId + "&postNo=" + postNo;

}
function redirect_PaymentStatus() {
    var advId = $("#AdvertisementNo option:selected").val();
    var postNo = $("#PostCat_No option:selected").val();
    var notificationId = $(".notId").text();
    window.location.href = "../Payment/TransactionDetails_RHQ?notificationid=" + notificationId + "&examId=" + 8 + "&advId=" + advId + "&postNo=" + postNo;

}
function redirect_ApplicationStatus() {
    var advId = $("#AdvertisementNo option:selected").val();
    var postNo = $("#PostCat_No option:selected").val();
    var notificationId = $(".notId").text();
    window.location.href = "../CandidatePortal/Applicationportalstatus_RHQ?notificationid=" + notificationId + "&advId=" + advId + "&postNo=" + postNo;

}
function redirect_KnowYourStatus() {
    var advId = $("#AdvertisementNo option:selected").val();
    var postNo = $("#PostCat_No option:selected").val();
    var notificationId = $(".notId").text();
    window.location.href = "../CandidatePortal/KnowUrStatus?notificationid=" + notificationId;

}
//end- Candidate portal


//General Purpose

//formatId=1 for dd-mm-yyyy,formatId=2 for yyyy-mm-dd
//outputs=null,invalid,JavascriptDate

function validateDate(inputString, formatId) {
    if (inputString != "" && inputString != undefined) {
        var dateString;
        var array = inputString.split(/[\/-]+/);

        if (formatId == 1 && array.length == 3) {
            dateString = array[2] + "-" + array[1] + "-" + array[0];
        }
        if (formatId == 2 && array.length == 3) {
            dateString = array[0] + "-" + array[1] + "-" + array[2];
        }

        var date = new Date(dateString);
        if (date == "Invalid Date") {
            return "invalid";
        }
        return date;
    }
    else return "null";
}
//end-General Purpose