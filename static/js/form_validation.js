<script src="../Scripts/jquery.validate.min.js"></script>
<script type="text/javascript">
    function validateZeroInAlphaNumeric(controlValue) {
        var idArr = $.trim(controlValue).split('');
        var idLength = idArr.length;
        var countIdLength = 0;
        for (var z = 0; z < idArr.length; z++) {
            if (idArr[z] == "0") {
                countIdLength++;
            }
        }
        if (idLength == countIdLength) {
            return false;
        }
        else {
            return true;
        }
    }

    function DisableLTI(isAdddharValue) {
        //Aadhar value is presnet so make LTI disabled
        if (isAdddharValue == 'Yes') {
            $('#imgThumbImpression').attr('src', '');
            $('#imgThumbImpression').attr('style', 'display:none');
            $('#imgcloseimgThumbImpression').attr('style', 'display:none');
            $('#fileThumbImpression').val('');
            $('#lblerrorfileThumbImpression').html('');

            var LTIValue = document.getElementsByName('Titype');
            if (document.getElementById('fileOtherType') != null) {
                document.getElementById('fileOtherType').disabled = true;
            }
            if (document.getElementById('fileThumbImpression') != null) {
                document.getElementById('fileThumbImpression').disabled = true;
            }

            if (LTIValue != null) {
                for (i = 0; i < LTIValue.length; i++) {
                    LTIValue[i].checked = false;
                    LTIValue[i].disabled = true;
                }
            }
        } else {
            var LTIValue = document.getElementsByName('Titype');
            if (document.getElementById('fileOtherType') != null) {
                document.getElementById('fileOtherType').disabled = false;
            }
            if (document.getElementById('fileThumbImpression') != null) {
                document.getElementById('fileThumbImpression').disabled = false;
            }
            if (LTIValue != null) {
                for (i = 0; i < LTIValue.length; i++) {
                    LTIValue[i].disabled = false;
                    LTIValue[0].checked = false;
                }
            }
        }
    }

    $(document).ready(function () {

        $("#btncloseFrom").click(function () {
            ////debugger;
            $('#confirmReg').hide();
            var RegStatus = $("#hdnflag").val();
            if (RegStatus == 'yes') {
                var urltemp  ='/Registration/Registration';
                window.location.href = urltemp;
                return true;
            }
            else {
                return false;
            }
        });

        $("#btnPersonalReset").click(function () {
            $(".error-message").html('');
            $('#lblregnumber').html("");
            $("select").prop("selectedIndex", 0);
            $("input:radio[name='DoyouhaveAadhar']").prop("checked", false);
            $("input:radio[name='DoyouhaveAadhar'][value='No']").prop("checked", true);
            $("input:radio[name='DoyouhaveAadhar'][value='No']").trigger("change");

            $("input:radio[name='HaveEverChangedName']").prop("checked", false);
            $("input:radio[name='HaveEverChangedName'][value='No']").prop("checked", true);
            $("input:radio[name='HaveEverChangedName'][value='No']").trigger("change");

            $("input:radio[name='Gender']").prop("checked", false);
            $("input:radio[name='VerifyGender']").prop("checked", false);

            $("input:text").val("");
            $("textarea").val("");

            //////debugger;
            $.ajax({
                url: "/Registration/AjaxClearSessions",
                type: "POST",
                dataType: "text",
                contentType: "application/json; charset=utf-8",
                data: "{}",
                success: function (result) {
                    ////////debugger;
                },
                error: function (xhr, statusText, error) {
                    ////debugger;
                    alert("Please Refresh the form");
                },
            });
        });

        $('input[type="text"]').bind("cut copy paste", function (e) {
            //////debugger;
            e.preventDefault();
            $('#confirmReg').show();
            $('.confirmRegMsg').html('Copy and Paste is not allowed');
            $("#hdnflag").val("no");
        });
        $("#VerifyAadharNumber,#AadharNumber").keyup(function () {
            if ($.trim($("#VerifyAadharNumber").val()) != "") {
                $("#lblVerifyAadharSupp").html('');
                if ($.trim($("#VerifyAadharNumber").val()) != $.trim($("#AadharNumber").val())) {
                    $("#lblVerifyAadharSupp").html('Aadhaar Number is a mismatch');
                    return false;
                }
                else {
                    $("#lblVerifyAadharSupp").html('');
                    return true;
                }
            }
            else {
                $("#lblVerifyAadharSupp").html('');
            }

        });

        $("#VerifyName,#Name").keyup(function () {
            if ($.trim($("#VerifyName").val()) != "") {
                $("#lblVerifyName").html('');
                if ($.trim($("#VerifyName").val()).toUpperCase() != $.trim($("#Name").val()).toUpperCase()) {
                    $("#lblVerifyName").html('Name is a mismatch');
                    return false;
                }
                else {
                    $("#lblVerifyName").html('');
                    return true;
                }
            }
            else {
                $("#lblVerifyName").html('');
            }
        });
        $("#NewName").keyup(function () {
            if ($.trim($("#NewName").val()) != "") {
                $("#lblNewName").html('');
                if ($.trim($("#NewName").val()).toUpperCase() == $.trim($("#Name").val()).toUpperCase()) {
                    $("#lblNewName").html('New Name should be different from previous Name');
                    return false;
                }
                else {
                    $("#lblNewName").html('');
                    return true;
                }
            }
            else {
                $("#lblNewName").html('');
            }
        });
        $("#VerifyFatherName,#FatherName").keyup(function () {
            if ($.trim($("#VerifyFatherName").val()) != "") {
                $("#lblVerifyFatherName").html('');
                if ($.trim($("#VerifyFatherName").val()).toUpperCase() != $.trim($("#FatherName").val()).toUpperCase()) {
                    $("#lblVerifyFatherName").html('Father name is a mismatch');
                    return false;
                }
                else {
                    $("#lblVerifyFatherName").html('');
                    return true;
                }
            }
            else {
                $("#lblVerifyFatherName").html('');
            }
        });

        $("#VerifyMotherName,#MotherName").keyup(function () {
            if ($.trim($("#VerifyMotherName").val()) != "") {
                $("#lblVerifyFatherName").html('');
                if ($.trim($("#VerifyMotherName").val()).toUpperCase() != $.trim($("#MotherName").val()).toUpperCase()) {
                    $("#lblVerifyMotherName").html('Mother name is a mismatch');
                    return false;
                }
                else {
                    $("#lblVerifyMotherName").html('');
                    return true;
                }
            }
            else {
                $("#lblVerifyMotherName").html('');
            }
        });

        $("#VerifyDateOfBirth,#DateOfBirth").blur(function () {

            var dobDate = $.trim($(this).val());
            var thisId = $.trim($(this).attr("id"));
            $("#lblDateOfBirth,#lblVerifyDateOfBirth").html("");
            var isValidDOB = true;
            if (dobDate.length < 10) {
                isValidDOB = false;
            }
            else {
                if (dobDate.split('../index.html').length != 3) {
                    isValidDOB = false;
                }
                else {
                    try {
                        var bD = dobDate.split('../index.html');
                        if (bD[0] == null || bD[0] == undefined || bD[0].length != 2 || bD[0] == "00") {
                            isValidDOB = false;
                        }
                        else if (bD[1] == null || bD[1] == undefined || bD[1].length != 2 || bD[1] == "00") {
                            isValidDOB = false;
                        }
                        else if (bD[2] == null || bD[2] == undefined || bD[2].length != 4 || bD[2] == "0000") {
                            isValidDOB = false;
                        }
                    }
                    catch (err) {
                        if (thisId.toLowerCase() == "dateofbirth") {
                            $("#lblDateOfBirth").html("Not a valid date");
                        }
                        else {
                            $("#lblVerifyDateOfBirth").html("Not a valid date");
                        }
                        return false;
                    }
                }
            }

            if (isValidDOB == false && $.trim($(this).val()) != "") {
                $(this).val("");
                if (thisId.toLowerCase() == "dateofbirth") {
                    $("#lblDateOfBirth").html("Invalid date format");
                }
                else {
                    $("#lblVerifyDateOfBirth").html("Invalid date format");
                }
                return false;
            }
            else {
                if ($("#Yearofpassing").prop("selectedIndex") > 0 && $.trim($(this).val()) != "") {
                    var passingYear = $.trim($("#Yearofpassing").val());
                    var dobYearHere = $.trim($(this).val()).includes('../index.html') ? $.trim($(this).val()).split('../index.html')[2] : "0";
                    if (parseInt(passingYear) < parseInt(dobYearHere)) {
                        $(this).val("");
                        if (thisId.toLowerCase() == "dateofbirth") {
                            $("#lblDateOfBirth").html("Date of birth can not be greater than passing year of metric");
                        }
                        else {
                            $("#lblVerifyDateOfBirth").html("Date of birth can not be greater than passing year of metric");
                        }
                        return false;
                    }
                    else if ($('#Yearofpassing').prop("selectedIndex") > 0 && $('#Yearofpassing').val() != "") {
                        $("#lblYearofpassing").html("");
                    }
                }
            }

            $("#lblDateOfBirth").html('');
            var bDay =$.trim($('#DateOfBirth').val());
            if (bDay.length == 10) {
                var now = new Date();
                bD = bDay.split('../index.html');
                if (bD.length == 3) {
                    if (bD[2].length == 4) {
                        born = new Date(bD[2], bD[1] * 1 - 1, bD[0]);
                        years = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
                        ////if (years < 17) {
                        if (years < 15) {
                            ////$("#lblDateOfBirth").html('Since your age is less than 17,hence you are not eligible for registration.');
                            $("#lblDateOfBirth").html('Since your age is less than 15, hence you are not eligible for registration.');
                            $('#DateOfBirth').val('');
                            return true;
                        }
                        ////////else if (years = 17 || years > 17) {
                        else if (years >= 15) {
                            if ($.trim($("#VerifyDateOfBirth").val()) != "") {
                                $("#lblVerifyDateOfBirth").html('');
                                if ($.trim($('#DateOfBirth').val()) == $.trim($('#VerifyDateOfBirth').val())) {
                                    $("#lblVerifyDateOfBirth").html('');
                                    return false;
                                }
                                else {
                                    $("#lblVerifyDateOfBirth").html('Date of Birth is a mismatch');
                                    return true;
                                }
                            }
                            else {
                                $("#lblVerifyDateOfBirth").html('');
                            }
                        }
                    }
                }
                else {
                    $("#lblDateOfBirth").html('Invalid Date, Date should be in DD/MM/YYYY Format only.');
                }
            }
            else {
                if (bDay.length != 0)
                    $("#lblDateOfBirth").html('Invalid Date, Date should be in DD/MM/YYYY Format only.');
            }
        });

        $("#ddlEducationBoard").change(function () {
            //////debugger;
            if ($.trim($("#ddlEducationBoard").val()) != "") {
                $("#lblVerifyEducationBoard").html('');
                if ($.trim($('#EducationBoard').val()) == $.trim($('#ddlEducationBoard').val())) {
                    $("#lblVerifyEducationBoard").html('');
                    return true;
                }
                else {
                    $("#lblVerifyEducationBoard").html('Education Board is a mismatch');
                    $('#ddlEducationBoard').val("");
                    return false;
                }
            }
            else {
                $("#lblVerifyEducationBoard").html('Education Board is mandatory');
            }
        });


        $("#VerifySecondaryRollNum,#SecondaryRollNum").keyup(function () {
            if ($.trim($("#VerifySecondaryRollNum").val()) != "") {
                $("#lblVerifySecondaryRollNum").html('');
                if ($.trim($("#VerifySecondaryRollNum").val()).toLowerCase() == $.trim($("#SecondaryRollNum").val()).toLowerCase()) {
                    $("#lblVerifySecondaryRollNum").html('');
                    return false;
                }
                else {
                    $("#lblVerifySecondaryRollNum").html('Roll Number is a mismatch');
                    return true;
                }
            }
            else {
                $("#lblVerifySecondaryRollNum").html('');
            }
        });

        $("#ddlYearofpassing").change(function () {

            if ($.trim($("#ddlYearofpassing").val()) != "") {
                $("#lblVerifyYearofpassing").val('');
                if ($.trim($('#Yearofpassing').val()) == $.trim($('#ddlYearofpassing').val())) {
                    $("#lblVerifyYearofpassing").html('');
                    return true;
                }
                else {
                    $("#lblVerifyYearofpassing").html('Year of Passing is a mismatch');
                    $('#ddlYearofpassing').val("");
                    return false;
                }
            }
            else {
                $("#lblVerifyYearofpassing").html('Year of Passing is mandatory');
            }
        });

        $('input[type=radio][name=VerifyGender]').change(function () {
            // ////debugger;
            $("#lblerrorVerifyGender").html('');
            if ($.trim($("input[name='Gender']:checked").val()) != $.trim(this.value)) {
                $("#lblerrorVerifyGender").html('Gender is a mismatch');
                return false;
            }
            else {
                $("#lblerrorVerifyGender").html('');
                return true;
            }
        });
        $("#MobileNum").attr('maxlength', '10');

        $("#AadharNumber").val(''); //AadharNumber removed after demo
        $('#AadharNumber').blur(function () {
            if (isNaN($("#AadharNumber").val())) {
                $("#AadharNumber").val('');
                $("#lblAadharNumber").html('Aadhaar Number should be a number');
                return false;
            }
            if ($.trim($('#AadharNumber').val()) != "") {
                if ($.trim($("#AadharNumber").val()).length == 12) {
                    var varAadharNumber = $.trim($("#AadharNumber").val());
                    jQuery.ajax({
                        url: "/Registration/GetRegistrationDetails",
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: "{strAadharNumber:'" + varAadharNumber + "'}",
                        success: successFuncAadhar,
                        failure: errorFunc
                    });
                }
            }
        });
        function successFuncAadhar(data) {
            //AadharNumber removed after demo start here
            if ($.trim(data.vc_id).toLowerCase() == "aadhar already exists") {
                $('#lblAadharNumber').html(data.vc_id);
                $("#AadharNumber").val('');
            }
            else {
                $('#lblAadharNumber').html('');
            }
        }
        $("#Yearofpassing").attr('maxlength', '4');

        $('#Yearofpassing').change(function () {
            $("#lblYearofpassing").html("");
            $("#lblVerifyYearofpassing").html("");
            ////$("#lblYearofpassing").html('');
            ////if ($.trim($("#DateOfBirth").val()) != "") {
            ////    var dob = $.trim($("#DateOfBirth").val()).split('/');
            ////    if (dob.length == 3) {
            ////        if (dob[2] != undefined && dob[2] != null && dob[2].length == 4) {
            ////            var dobYear = dob[2];
            ////            var passingYear = $.trim($("#Yearofpassing").val());
            ////            if ((parseInt(passingYear) - parseInt(dobYear)) < 15) {
            ////                $("#lblYearofpassing").html("Difference between date of birth and passing year can not be less than 15 years");
            ////                $('#Yearofpassing').prop("selectedIndex", 0);
            ////                return false;
            ////            }
            ////        }
            ////    }
            ////}

            if ($.trim($("#DateOfBirth").val()) != "") {
                var thisYear = $.trim($(this).val());
                var dobYear = $.trim($("#DateOfBirth").val()).includes('../index.html') ? $.trim($("#DateOfBirth").val()).split('../index.html')[2] : "0";
                if (parseInt(thisYear) < parseInt(dobYear)) {
                    $("#lblYearofpassing").html("Year of passing can not be less than date of birth");
                    $(this).prop("selectedIndex", 0);
                    return false;
                }
                else if ($.trim($("#DateOfBirth").val()) != "") {
                    $("#lblDateOfBirth").html("");
                }
            }

            $('#lblYearofpassing').html('');
            if ($.trim($("#ddlYearofpassing").val()) != "") {
                $("#lblVerifyYearofpassing").html('');
                if ($.trim($('#Yearofpassing').val()) == $.trim($('#ddlYearofpassing').val())) {
                    $("#lblVerifyYearofpassing").html('');
                    return true;
                }
                else {
                    if ($.trim($(this).val()) == "") {
                        $("#lblYearofpassing").html('Year of Passing is mandatory');
                    }
                    else {
                        $("#lblVerifyYearofpassing").html('Year of Passing is a mismatch');
                    }

                    $('#ddlYearofpassing').val("");
                    return false;
                }
            }
            else {
                if ($.trim($(this).val()) == "") {
                    $("#lblYearofpassing").html('Year of Passing is mandatory');
                }
                else {
                    $("#lblVerifyYearofpassing").html('');
                }
            }
        });

        $("#SecondaryRollNum").attr('maxlength', '15');
        $("#VerifySecondaryRollNum").attr('maxlength', '15');
        $("#NewName").attr("disabled", "disabled");
        $('input[type=radio][name=HaveEverChangedName]').change(function () {
            if ($.trim(this.value).toLowerCase() == 'yes') {
                $("#NewName").removeAttr("disabled");
                document.getElementById("lblnewnamesupp").innerHTML = '2d. New Name / Changed Name <sup>&#9733;</sup>';
            }
            else {
                $("#NewName").val('');
                $("#NewName").attr("disabled", "disabled");
                $('#lblNewName').html('');
                document.getElementById("lblnewnamesupp").innerHTML = '2d. New Name / Changed Name ';
            }
        });

        $("#AadharNumber").attr("disabled", "disabled");   //AadharNumber removed after demo

        $('input[type=radio][name=DoyouhaveAadhar]').change(function () {
            if ($.trim($(this).val()).toLowerCase() == 'yes') {
                DisableLTI(this.value);
                $('#lblAadharNumber').html('');
                $('#lblVerifyAadharSupp').html('');
                $('#lblAadharEnrollmentSupp').html('');
                $('#lblIDnumber').html('');
                $('#lblTypeofID').html('');
                // After emptying all the labels....
                //make all of them enable at the first place....
                $('#AadharNumber').prop("disabled", false);
                $('#VerifyAadharNumber').prop("disabled", false);
                $('#AadharEnrollmentID').prop("disabled", false);
                $('#TypeofID').prop("disabled", false);
                $('#IDNumber').prop("disabled", false);
                //then disable the entries which are supposed to be disabled...
                $('#AadharEnrollmentID').prop("disabled", true);
                $('#TypeofID').prop("disabled", true);
                $('#IDnumber').prop("disabled", true);
                $("#TypeofID").val("");
                $("#IDnumber").val('');
                $('#AadharEnrollmentID').val('');
                $('#TypeofID').prop("disabled", true);
                $('#IDnumber').prop("disabled", true);
                document.getElementById("lblAadharSupp").innerHTML = '1a. Aadhaar Number <sup>&#9733;</sup>';
                document.getElementById('lblVerifyAadharSupp1').innerHTML = '1b. Verify Aadhaar Number <sup>&#9733;</sup>'

                document.getElementById("TypeofIDsupp").innerHTML = '1c. Type of ID ';
                document.getElementById("IDnumbersupp").innerHTML = '1d. ID Number ';
                $("#lblTypeofID").html("");
            }
            if ($.trim($(this).val()).toLowerCase() == 'no') {
                DisableLTI(this.value);
                //////debugger;
                $('#lblAadharNumber').html('');
                $('#lblVerifyAadharSupp').html('');
                $('#lblAadharEnrollmentSupp').html('');
                $('#lblIDnumber').html('');
                $('#lblTypeofID').html('');

                //disable the fields.......
                // After emptying all the labels....
                //make all of them enable at the first place....
                $('#AadharNumber').prop("disabled", true);
                $('#VerifyAadharNumber').prop("disabled", true);
                $('#AadharEnrollmentID').prop("disabled", true);
                $('#TypeofID').prop("disabled", true);
                $('#IDnumber').prop("disabled", true);
                //// Make the fields empty.....
                $('#AadharNumber').val(null);
                $('#VerifyAadharNumber').val(null);
                $('#AadharEnrollmentID').val(null);
                //disable the fields.......
                $('#TypeofID').prop("disabled", false);
                $('#IDnumber').prop("disabled", false);
                document.getElementById("lblAadharSupp").innerHTML = '1a. Aadhaar Number ';
                document.getElementById('lblVerifyAadharSupp1').innerHTML = '1b. Verify Aadhaar Number '

                document.getElementById("TypeofIDsupp").innerHTML = '1c. Type of ID <sup>&#9733;</sup> ';
                document.getElementById("IDnumbersupp").innerHTML = '1d. ID Number <sup>&#9733;</sup> ';
            }

        });


        $("#btnsubmit1").click(function () {
            ////debugger;
            $("#overlay").show();
            //////debugger;
            var errorreturnvalue = true;
            // Aadhar number checking condition start here removed after demo
            if ($.trim($('input[type=radio][name=DoyouhaveAadhar]:checked').val()).toLowerCase() == 'yes') {
                $('#lblAadharNumber').html('');
                $('#lblAadharEnrollmentSuppl').html('');
                $('#lblVerifyAadharSupp').html('');
                $('#lblTypeofID').html('');
                $('#lblIDnumber').html('');

                if ($.trim($("#AadharNumber").val()) != "") {
                    if ($.trim($("#AadharNumber").val()).length == 12) {
                        if (!$.isNumeric($("#AadharNumber").val())) {
                            $('#lblAadharNumber').html('Aadhaar Number should be a number');
                            errorreturnvalue = false;
                        }
                        else {
                            if (validateZeroInAlphaNumeric($("#AadharNumber").val()) == false) {
                                errorreturnvalue = false;
                                $('#lblAadharNumber').html('Please enter a valid aadhaar number.');
                            }
                        }
                    }
                    else {
                        $('#lblAadharNumber').html('Aadhaar Number length should be 12');
                        errorreturnvalue = false;
                    }
                }
                else {
                    $('#lblAadharNumber').html('Aadhaar Number is mandatory');
                    errorreturnvalue = false;
                }
                if ($.trim($('#VerifyAadharNumber').val()) == "") {
                    ////$('#lblVerifyAadharSupp').html('Please verify the Aadhaar.');
                    $('#lblVerifyAadharSupp').html('Aadhaar number is mandatory.');
                    errorreturnvalue = false;
                }
                else if ($.trim($('#VerifyAadharNumber').val()) != $.trim($("#AadharNumber").val())) {
                    $('#lblVerifyAadharSupp').html('Aadhaar no. is a mismatch');
                    errorreturnvalue = false;
                }
                else {
                    $('#lblVerifyAadharSupp').html('');
                }
            }
            else if ($.trim($('input[type=radio][name=DoyouhaveAadhar]:checked').val()).toLowerCase() == "no") {

                $('#lblAadharNumber').html('');
                $('#lblAadharEnrollmentSuppl').html('');
                $('#lblVerifyAadharSupp').html('');
                $('#lblTypeofID').html('');
                $('#lblIDnumber').html('');
                if ($.trim($('#TypeofID').val()) == "") {
                    $('#lblTypeofID').html('Type of id is mandatory');
                    errorreturnvalue = false;
                }
                if ($.trim($('#IDnumber').val()) == "") {
                    $('#lblIDnumber').html('ID number is mandatory');
                    errorreturnvalue = false;
                }
                else {
                    if (validateZeroInAlphaNumeric($("#IDnumber").val()) == false) {
                        errorreturnvalue = false;
                        $('#lblIDnumber').html('Please enter a valid id number.');
                    }
                    else {
                        var idChars = $.trim($("#IDnumber").val()).split('');
                        var idCharsLength = $.trim($("#IDnumber").val()).length;
                        var idSpCharsLength = 0;
                        $.each(idChars, function (index, value) {
                            if ($.trim(value) == "/" || $.trim(value) == "-") {
                                idSpCharsLength++;
                            }
                        });
                        ////alert(idSpCharsLength);
                        if (idSpCharsLength == idCharsLength) {
                            errorreturnvalue = false;
                            $('#lblIDnumber').html('Please enter a valid id number.');
                        }
                    }
                }
            }

            // Aadhar number checking condition end here removed after demo
            if ($.trim($('input[type=radio][name=HaveEverChangedName]:checked').val()).toLowerCase() == "yes") {
                if ($.trim($("#NewName").val()) == '') {
                    $('#lblNewName').html('New name is mandatory');
                    errorreturnvalue = false;
                }
                else {
                    $('#lblNewName').html('');
                    if ($.trim($("#NewName").val()).length < 2) {
                        $("#lblNewName").html('New name at least 2 characters long');
                        errorreturnvalue = false;
                    }
                    else if ($.trim($("#NewName").val()).toUpperCase() == $.trim($("#Name").val()).toUpperCase()) {
                        $("#lblNewName").html('New Name should be different from previous Name');
                        errorreturnvalue = false;
                    }
                    else
                        $("#lblNewName").html('');
                }

            }


            if ($("input[name='Gender']:checked").length <= 0) {
                $('#lblerrorGender').html('Gender is mandatory');
                errorreturnvalue = false;
            }
            else {
                $('#lblerrorGender').html('');
                if ($.trim($("input[name='Gender']:checked").val()).toLowerCase() != $.trim($("input[name='VerifyGender']:checked").val()).toLowerCase()) {
                    $("#lblerrorVerifyGender").html('Gender is a mismatch');
                    errorreturnvalue = false;
                }
            }

            if ($.trim($("#Name").val()) == '') {
                $("#lblName").html('Name is mandatory');
                errorreturnvalue = false;
            }
            else {
                $("#lblName").html('');

            if ($.trim($("#VerifyName").val()).length < 2) {
                    $("#lblName").html('Name must be at least 2 characters long');
                    errorreturnvalue = false;
                }
            }
            if ($.trim($("#VerifyName").val())=="") {
                $("#lblVerifyName").html('Name is mandatory');
                errorreturnvalue = false;
            }
            else if ($.trim($("#VerifyName").val()).toUpperCase() != $.trim($("#Name").val()).toUpperCase()) {
                $("#lblVerifyName").html('Name is a mismatch');
                errorreturnvalue = false;
            }
            else {
                $("#lblVerifyName").html('');
            }

            if ($.trim($("#FatherName").val()) == '') {
                $('#lblFatherName').html('Father Name is mandatory');
                errorreturnvalue = false;
            }
            else {
                $('#lblFatherName').html('');
                if ($.trim($("#FatherName").val()).length < 2) {
                    $("#lblFatherName").html('Father name must be at least 2 characters long');
                    errorreturnvalue = false;
                }
                else if ($.trim($("#VerifyFatherName").val()).toUpperCase() != $.trim($("#FatherName").val()).toUpperCase()) {
                    $("#lblVerifyFatherName").html('Father name is a mismatch');
                    errorreturnvalue = false;
                }
                else {
                    $("#lblVerifyFatherName").html('');
                }
            }

            if ($.trim($("#MotherName").val()) == '') {
                $('#lblMotherName').html('Mother Name is mandatory');
                errorreturnvalue = false;
            }
            else {
                $('#lblMotherName').html('');
                if ($.trim($("#MotherName").val()).length < 2) {
                    $("#lblMotherName").html('Mother name must be at least 2 characters long');
                    errorreturnvalue = false;
                }
                else if ($.trim($("#VerifyMotherName").val()).toUpperCase() != $.trim($("#MotherName").val()).toUpperCase()) {
                    $("#lblVerifyMotherName").html('Mother name is a mismatch');
                    errorreturnvalue = false;
                }
                else {
                    $("#lblVerifyMotherName").html('');
                }
            }

            if ($.trim($("#EducationBoard").val()) == '') {
                $('#lblEducationBoard').html('Education board is mandatory');
                errorreturnvalue = false;
            }
            else { $('#lblEducationBoard').html(''); }


            if ($.trim($("#ddlEducationBoard>option:selected").html()).toLowerCase() == "--select--" || $.trim($("#ddlEducationBoard").val()) == "" || $.trim($("#ddlEducationBoard").val()) == "0") {
                    $('#lblVerifyEducationBoard').html('Education board is mandatory');
                    errorreturnvalue = false;
                }
                else if ($.trim($("#EducationBoard").val()) != $.trim($("#ddlEducationBoard").val())) {
                    $('#lblVerifyEducationBoard').html('Education board is a mismatch');
                    errorreturnvalue = false;
                }
                else {
                    $('#lblVerifyEducationBoard').html("");
                }


            if ($.trim($("#OriginState").val()) == '') {
                $('#lblOriginState').html('State / UT of Permanent Address is mandatory');
                errorreturnvalue = false;
            }

            if ($.trim($("#Yearofpassing>option:selected").html()).toLowerCase() == "--select--" || $.trim($("#Yearofpassing").val()) == "" || $.trim($("#Yearofpassing").val()) == "0") {
                $("#lblVerifyYearofpassing").html('Year of Passing is mandatory');
                errorreturnvalue = false;
            }
            else {
                $("#lblVerifyYearofpassing").html('');
            }

            if ($.trim($("#ddlYearofpassing>option:selected").html()).toLowerCase() == "--select--" || $.trim($("#ddlYearofpassing").val()) == "" || $.trim($("#ddlYearofpassing").val()) == "0") {
                $("#lblVerifyYearofpassing").html('Year of passing is mandatory');
                errorreturnvalue = false;
            }
            else if ($.trim($("#ddlYearofpassing").val()) != $.trim($("#Yearofpassing").val())) {
                $("#lblVerifyYearofpassing").html('Year of passing is a mismatch');
                errorreturnvalue = false;
            }
            else {
                $("#lblVerifyYearofpassing").html('');
            }

            ////if ($.trim($("#DateOfBirth").val()) != "" && $('#Yearofpassing').prop("selectedIndex") > 0) {
            ////    var dob = $.trim($("#DateOfBirth").val()).split('/');
            ////    if (dob.length == 3) {
            ////        if (dob[2] != undefined && dob[2] != null && dob[2].length == 4) {
            ////            var dobYear = dob[2];
            ////            var passingYear = $.trim($("#Yearofpassing").val());
            ////            if ((parseInt(passingYear) - parseInt(dobYear)) < 15) {
            ////                $("#lblYearofpassing").html("Difference between date of birth and passing year can not be less than 15 years");
            ////                errorreturnvalue = false;
            ////            }
            ////        }
            ////    }
            ////}

            if ($.trim($("#MotherName").val()) == '') {
                $('#lblVerifyMotherName').html('Mother Name is mandatory');
                errorreturnvalue = false;
            }

            if ($.trim($("#FatherName").val()) == '') {
            $('#lblVerifyFatherName').html('Father Name is mandatory');
               errorreturnvalue = false;
            }

            if ($.trim($("#DateOfBirth").val()) == '') {
                $('#lblVerifyDateOfBirth').html('Date of Birth is mandatory');
                errorreturnvalue = false;
            }

            if ($("input[name='VerifyGender']:checked").length<=0) {
                $('#lblerrorVerifyGender').html('Gender is mandatory');
                errorreturnvalue = false;
            }

            if ($.trim($("#SecondaryRollNum").val()) == '') {
                $('#lblSecondaryRollNum').html('Roll Number is mandatory');
                errorreturnvalue = false;
            }

            if ($.trim($("#VerifyName").val()) == '') {
                $('#lblVerifyName').html('Name is mandatory');
                errorreturnvalue = false;
            }

            if ($.trim($("#SecondaryRollNum").val()) == '') {
                $('#lblVerifySecondaryRollNum').html('Roll Number is mandatory');
                errorreturnvalue = false;
            }
            else {
                if ($.trim($("#SecondaryRollNum").val()).length > 15) {
                        $('#lblSecondaryRollNum').html('Roll Number is mandatory and length can only be upto 15 digits');
                        errorreturnvalue = false;
                }
                else {
                    if (validateZeroInAlphaNumeric($("#SecondaryRollNum").val()) == false) {
                        errorreturnvalue = false;
                        $('#lblSecondaryRollNum').html('Please enter a valid roll number.');
                    }
                    else {
                        $('#lblSecondaryRollNum').html('');
                    }

                    if ($.trim($("#VerifySecondaryRollNum").val()) == "") {
                        $("#lblVerifySecondaryRollNum").html('Roll number is mandatory');
                        errorreturnvalue = false;
                    }
                    else if ($.trim($("#VerifySecondaryRollNum").val()).toLowerCase() != $.trim($("#SecondaryRollNum").val()).toLowerCase()) {
                        $("#lblVerifySecondaryRollNum").html('Roll number is a mismatch');
                        errorreturnvalue = false;
                    }
                    else {
                        $("#lblVerifySecondaryRollNum").html('');
                    }
                }
            }
//Client side validations:
            if ($.trim($("#DateOfBirth").val()) == '') {
                $('#lblDateOfBirth').html('Date of Birth is mandatory');
                errorreturnvalue = false;
            }
            else {
                $('#lblDateOfBirth').html('');
                if ($.trim($('#VerifyDateOfBirth').val()) == "") {
                    $("#lblVerifyDateOfBirth").html('Date of birth is mandatory');
                    errorreturnvalue = false;
                }
                else if ($.trim($('#DateOfBirth').val()) == $.trim($('#VerifyDateOfBirth').val())) {
                    $("#lblVerifyDateOfBirth").html('');
                }
                else {
                    $("#lblVerifyDateOfBirth").html('Date of birth is a mismatch');
                    errorreturnvalue = false;
                }
            }

            if ($.trim($("#DateOfBirth").val()) != '') {
                if ($.trim($("#DateOfBirth").val()).includes('../index.html') == true) {
                    var dobArr1 = $.trim($("#DateOfBirth").val()).split('../index.html');
                    var dobMon1 = dobArr1[1];
                    var dobDate1 = dobArr1[0];
                    if ($.trim(dobMon1) == "00" || $.trim(dobMon1) == "0" || $.trim(dobDate1) == "0" || $.trim(dobDate1) == "00") {
                        $('#lblDateOfBirth').html('Please enter a valid date of birth');
                        errorreturnvalue = false;
                    }
                    else {
                        if (parseInt(dobMon1) == 2) {
                            if (parseInt(dobDate1) >= 30) {
                                $('#lblDateOfBirth').html('Please enter a valid date of birth');
                                errorreturnvalue = false;
                            }
                        }
                    }
                }
                else {
                    $('#lblDateOfBirth').html('Please enter a valid date of birth in the format dd/mm/yyyy');
                    errorreturnvalue = false;
                }
            }

            if ($.trim($("#DateOfBirth").val()) != '' && ($.trim($("#Yearofpassing").val()) != '' || $("#Yearofpassing").prop("selectedIndex") > 0)) {
                var yearOfPassing = $.trim($("#Yearofpassing").val());
                var yearOfDob = $.trim($("#DateOfBirth").val()).includes('../index.html') ? yearOfDob = $.trim($("#DateOfBirth").val()).split('../index.html')[2] : "0";
                if (parseInt(yearOfDob) > parseInt(yearOfPassing)) {
                    $('#lblDateOfBirth').html('Date of Birth can not be greater than passing year of metric');
                    $('#lblYearofpassing').html('Passing year of metric can not be less than date of birth');
                    errorreturnvalue = false;
                }
            }

            if ($.trim($("#Levelofeducationqualification").val()) == '' || $.trim($("#Levelofeducationqualification").val()) == '0' || $.trim($("#Levelofeducationqualification>option:selected").html()).toLowerCase() =="--select--") {
                $('#lblLevelofeducationqualification').html('Level of Education is mandatory');
                errorreturnvalue = false;
            }
            else
                $('#lblLevelofeducationqualification').html('');
            //Changes start during the demo discussion

            if ($.trim($("#MobileNum").val()) == '') {
                $('#lblMobileNum').html('Mobile Number is mandatory');
                errorreturnvalue = false;
            }
            else {
                if ($.trim($("#MobileNum").val()).length == 10) {
                    if (!$.isNumeric($("#MobileNum").val())) {
                        $('#lblMobileNum').html('Mobile Number should be a number');
                        errorreturnvalue = false;
                    }
                    else {
                        var checkfrstlettermobile = $.trim($("#MobileNum").val()).substr(0, 1);
                        if (validateZeroInAlphaNumeric($("#MobileNum").val()) == false) {
                            errorreturnvalue = false;
                            $('#lblMobileNum').html('Please enter a valid mobile number.');
                        }
                        else if (checkfrstlettermobile < 6) {
                            $('#lblMobileNum').html('Not a valid Mobile Number');
                            errorreturnvalue = false;
                        }
                        else if ($.trim($("#VerifyMobileNum").val()) != "") {
                            if ($.trim($("#MobileNum").val()) != $.trim($("#VerifyMobileNum").val())) {
                                $('#lblVerifyMobileNum').html('Mobile number is a mismatch');
                                errorreturnvalue = false;
                            }
                        }
                        else {
                            $('#lblMobileNum').html('');
                        }
                    }

                    if ($.trim($("#MobileNum").val()).lastIndexOf('0') === 0) {
                        $('#lblMobileNum').html('Mobile number should not start with 0');
                        errorreturnvalue = false;
                    }
                }
                else {
                    $('#lblMobileNum').html('Mobile Number should be of 10 numbers');
                    errorreturnvalue = false;
                }
            }

            if ($.trim($("#VerifyMobileNum").val()) == "") {
                $('#lblVerifyMobileNum').html('Mobile number is mandatory');
                errorreturnvalue = false;
            }
            else {
                $('#lblVerifMobileNum').html('');
                if ($.trim($("#MobileNum").val()) != $.trim($("#VerifyMobileNum").val())) {
                    $('#lblVerifyMobileNum').html('Mobile number is a mismatch');
                    errorreturnvalue = false;
                }
            }

            if ($.trim($("#EmailID").val()) == '') {
                $('#lblEmailID').html('E-Mail ID is mandatory');
                errorreturnvalue = false;
            }
            else {
                var x = $.trim($("#EmailID").val());
                var atpos = x.indexOf("@");
                var dotpos = x.lastIndexOf(".");
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                    $('#lblEmailID').html('Not a valid E-Mail address');
                    errorreturnvalue = false;
                }
                else {
                    $('#lblEmailID').html('');
                    if ($.trim($("#VerifyEmailID").val()) != "") {
                        if ($.trim($("#EmailID").val()).toLowerCase() != $.trim($("#VerifyEmailID").val()).toLowerCase()) {
                            $('#lblVerifyEmailID').html('Email id is a mismatch');
                            errorreturnvalue = false;
                        }
                    }
                }
            }

            var jScriptEmailPatt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

            if (jScriptEmailPatt.test($.trim($("#EmailID").val())) == false) {
                $('#lblEmailID').html('Please enter a valid email id');
                errorreturnvalue = false;
            }

            if ($.trim($("#VerifyEmailID").val()) == "") {
                $('#lblVerifyEmailID').html('Email id is mandatory');
                errorreturnvalue = false;
            }
            else {
                $('#lblVerifyEmailID').html("");
                if ($.trim($("#EmailID").val()).toLowerCase() != $.trim($("#VerifyEmailID").val()).toLowerCase()) {
                    $('#lblVerifyEmailID').html('Email id is a mismatch');
                    errorreturnvalue = false;
                }
            }

            if ($.trim($("#Yearofpassing :selected").html()).toLowerCase() == "--select--" || $.trim($("#Yearofpassing").val()) == "" || $.trim($("#Yearofpassing>option:selected").html()).toLowerCase() == "--select--") {
                $("#lblYearofpassing").html('Year of Passing is mandatory');
                errorreturnvalue = false;
            }

            $("#overlay").hide();
            if (errorreturnvalue == false)
                return errorreturnvalue;

            $("#lblConfrmMobile").html("");
            $("#lblConfrmMail").html("");

            $("#lblConfrmMobile").html("Mobile Number " + $("#MobileNum").val());
            $("#lblConfrmMail").html("Email ID " + $("#EmailID").val());

            $('#confirmMobile').show();
        });

        $("#btnconfrmMobile").click(function () {
           // ////debugger;
            $("#overlay").show();
            var candidateName = $.trim($("#Name").val());
            if (candidateName.includes('\'')) {
                candidateName = candidateName.replace(/\'/g, "\\'");
            }
            var candidateFatherName = $.trim($("#FatherName").val());
            if (candidateFatherName.includes('\'')) {
                candidateFatherName = candidateFatherName.replace(/\'/g, "\\'");
            }
            var candidateMotherName = $.trim($("#MotherName").val());
            if (candidateMotherName.includes('\'')) {
                candidateMotherName = candidateMotherName.replace(/\'/g, "\\'");
            }
            var candidateNewName = $.trim($("#NewName").val());
            if (candidateNewName.includes('\'')) {
                candidateNewName = candidateNewName.replace(/\'/g, "\\'");
            }

            var dataRegistration = "{AadharNumber:'" + $.trim($("#AadharNumber").val())
            + "',Name:'" + candidateName
                + "',DoyouhaveAadhar:'" + $.trim($('input[type=radio][name=DoyouhaveAadhar]:checked').val())
                ////+ "',AadharEnrollmentID:'" + $.trim($("#AadharEnrollmentID").val())
                + "',AadharEnrollmentID:'" + ""
                + "',TypeofID:'" + $.trim($("#TypeofID").val())
                + "',IDnumber:'" + $.trim($("#IDnumber").val())
                + "',HaveEverChangedName:'" + $.trim($('input[type=radio][name=HaveEverChangedName]:checked').val())
              + "',NewName:'" + candidateNewName
              + "',FatherName:'" + candidateFatherName
              + "',MotherName:'" + candidateMotherName
                + "',DateOfBirth:'" + $.trim($("#DateOfBirth").val())
                + "',EducationBoard:'" + $.trim($("#EducationBoard").val())
                + "',SecondaryRollNum:'" + $.trim($("#SecondaryRollNum").val())
                + "',Yearofpassing:'" + $.trim($("#Yearofpassing").val())
                + "',Gender:'" + $.trim($("input[type=radio][name=Gender]:checked").val())
                + "',Levelofeducationqualification:'" + $.trim($("#Levelofeducationqualification").val())
                + "',MobileNum:'" + $.trim($("#MobileNum").val())
                + "',emailid:'" + $.trim($("#EmailID").val())
                + "',Stateid:'" + $.trim($("#OriginState").val())
              + "',moduleName:'" + "fresh"
              + "'}";

            jQuery.ajax({
                url: "/Registration/AjaxCheckSaveRegistration",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: dataRegistration,
                success: successFunc,
                error: errorFunc
            });

        $('#confirmMobile').hide();
            $('#lblEmailID').val('');
            $('#lblMobileNum').val('');

        });

        $("#btncancelMobile").click(function (e) {
            $('#confirmMobile').hide();
            $("#lblConfrmMobile").html("");
            $("#lblConfrmMail").html("");
        });

        //AadharNumber removal
        $("#IDnumber").keyup(function (e) {
            if ($.trim($('input[type=radio][name=DoyouhaveAadhar]:checked').val()).toLowerCase() != 'yes')
                CheckValidateTypeofID();
            else
                return true;
        });
        $("#VerifyEmailID").keyup(function () {
            $("#lblVerifyEmailID").html('');
            if ($.trim($("#EmailID").val()) != "") {
                $('#lblVerifyEmailID').html("");
                if ($.trim($("#EmailID").val()).toLowerCase() != $.trim($("#VerifyEmailID").val()).toLowerCase()) {
                    $('#lblVerifyEmailID').html('Email id is a mismatch');
                }
            }
        });
        $("#VerifyMobileNum").keyup(function () {
            $('#lblVerifyMobileNum').html('');

            if ($.trim($("#MobileNum").val()) != "" && $.trim($("#VerifyMobileNum").val())) {
                if ($.trim($("#MobileNum").val()) != $.trim($("#VerifyMobileNum").val())) {
                    $('#lblVerifyMobileNum').html('Mobile number is a mismatch');
                }
            }

        });
        function successFunc(saveRegResult, status) {
            ////debugger;
            $('#overlay').hide();
            //AadharNumber removed after demo start here
            if ($.trim(saveRegResult.vc_id).toLowerCase() == "this aadhar number already exists") {
                $('#lblAadharNumber').html($.trim(saveRegResult.vc_id));
                $("#AadharNumber").val('');
            }
            else {
                $('#lblAadharNumber').html('');
            }

            var arr = new Array();
            var str = $.trim(saveRegResult).toString();
            arr = str.split(',');
            if ($.trim(arr[3]).toLowerCase() == "recordexist") {
                $('#confirmReg').show();
                ////$('.confirmRegMsg').html("This user already exists.");
                ////$('.confirmRegMsg').html("Registration with same details already exists.");
                $('.confirmRegMsg').html("A Registration containing same details of Name and Matriculation related data already exists.");
            }
            else if ($.trim(arr[3]).toLowerCase() == "debarexist") {
                $('#confirmReg').show();
                $('.confirmRegMsg').html("Debarred candidates cannot register.");
            }
            else if ($.trim(arr[3]).toLowerCase() == "registration with same details already exists") {
                $('#overlay').hide();
                $('#confirmReg').show();
                ////$('.confirmRegMsg').html($.trim(arr[3]));
                $(".confirmRegMsg").html("A Registration containing same details of Name and Metriculation related data already exists.");
                return false;
            }
            else if ($.trim(arr[3]).toLowerCase() == "failure") {
                $('#overlay').hide();
                $('#sucMsgPopReg').show();
                $('.sucMsgtxtReg').html("Unable to save basic details please try again");
                return false;
            }
            else if ($.trim(arr[4]).toLowerCase() == "please select state / ut of permanent address") {
                $('#confirmReg').show();
                $('.confirmRegMsg').html("Please select State / UT of Permanent Address");
            }
            else {
                if (($.trim(arr[2]) == "1") || ($.trim(arr[1]) == "1")) {
                    $('.confirmRegMsg').html("This Mobile Number/ Email ID already exists.");
                }
                else if (($.trim(arr).length > 0 ? $.trim(arr[3]) : "No").toLowerCase() == "basic details are saved.") {


                    ////$('.confirmRegMsg').html(arr[3] + "Registration is partial and it should be completed within 7 days failing which your data would be automatically deleted. Please check both Inbox and Spam folder of your Email.");
                    $('.confirmRegMsg').html($.trim(arr[3]) + "Registration is partial and it should be completed within <span class='red' style='font-weight:bold;'>14 days</span> failing which your data would be automatically <span class='red' style='font-weight:bold;'>deleted</span>. Please check both Inbox and Spam folder of your Email.");

                    $('#lblregnumber').html('Registration No : ' + $.trim(arr[4]));
                    $("#hdnflag").val("yes");

                }
                else {
                    if ($.trim(arr[3]) != "") {
                        $('.confirmRegMsg').html($.trim(arr[3]));
                    }
                    else if (arr[6] != undefined && $.trim(arr[6]) != "") {
                        $('.confirmRegMsg').html(arr[6]);
                    }
                    $("#hdnflag").val("no");
                }

            }
            if ($.trim(saveRegResult).length > 0) {
                $('#confirmReg').show();
            }
        }

        function errorFunc(xhr,statusText,error) {
            $('#overlay').hide();
            alert('Server is busy please try again');
        }


        function getRegistration1() {
            window.location.replace("http://localhost:51232/SSC/RegistrationSuccess");
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        // function Allow space only when followed by an Alphabet

        function validate() {
            var firstname = document.getElementById("Name");
            alert(firstname);
            var alpha = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
            if (firstname.value == "") {
                alert('Please enter Name');
                return false;
            }
            else if (!firstname.value.match(alpha)) {
                alert('Invalid ');
                return false;
            }
            else {
                return true;
            }
        }

        function CheckValidateTypeofID() {
            //////debugger;
            $('#lblIDnumber').html('');
            if ($.trim($("#TypeofID").val()) == '3') { // PAN Card
                ////$('#IDnumber').prop("maxlength","10");
                $('#IDnumber').attr("maxlength", "10");
                if ($.trim($('#IDnumber').val()).length > 10) {
                    $('#IDnumber').val('');
                    $('#lblIDnumber').html('Not a valid PAN number');
                    return false;
                }
                else if ($.trim($('#IDnumber').val()).length < 10) {
                    $('#lblIDnumber').html('Not a valid PAN number');
                    return false;
                }
                if ($.trim($('#IDnumber').val()).length == 10) {
                    var panVal = $('#IDnumber').val();
                    var regpan = /[a-zA-z]{5}\d{4}[a-zA-Z]{1}/;
                    if (regpan.test(panVal)) {
                        $('#lblIDnumber').html('');
                        return true;
                    }
                    else {
                        $('#lblIDnumber').html('Not a valid PAN number');
                        $('#IDnumber').focus();
                        return false;
                    }
                }
            }
            else if ($.trim($("#TypeofID").val()) == '4') {  //Passport
                ////$('#IDnumber').prop("maxlength", "8");
                $('#IDnumber').attr("maxlength", "8");
                if ($.trim($('#IDnumber').val()).length > 8) {
                    $('#IDnumber').val('');
                    $('#lblIDnumber').html('Not a valid Passport');
                    return false;
                }
                if ($.trim($('#IDnumber').val()).length < 8) {
                    $('#lblIDnumber').html('Not a valid Passport');
                    return false;
                }
                if ($.trim($('#IDnumber').val()).length == 8) {
                    var regsaid = /[a-zA-z]{1}\d{7}/;
                    if (regsaid.test($('#IDnumber').val()) == false) {
                        $('#lblIDnumber').html('Not a valid Passport');
                        return false;
                    }
                    else {
                        $('#lblIDnumber').html('');
                        return true;
                    }
                }
            }
            else if ($.trim($("#TypeofID ").val()) == '6') { //Voter ID
                ////$('#IDnumber').prop("maxlength","20")
                $('#IDnumber').attr("maxlength", "20")
                if ($.trim($('#IDnumber').val()).length > 20 || $.trim($('#IDnumber').val()).length < 6) {
                    $('#lblIDnumber').html('Not a valid Voter ID');
                    return false;
                }
                else {
                    $('#lblIDnumber').html('');
                    return true;
                }
            }
            else if ($.trim($("#TypeofID").val()) == '') {
                ////$('#IDnumber').prop("maxlength","20")
                $('#IDnumber').attr("maxlength", "20")
                $('#lblIDnumber').html('ID Number is mandatory');
            }
            else {
                if (($.trim($('#IDnumber').val()).length > 20) && $.trim($('#IDnumber').val()).length > 0) {
                    $('#lblIDnumber').html('Not a valid ID');
                    return false;
                }
                else {
                    ////$('#IDnumber').prop("maxlength", "20");
                    $('#IDnumber').attr("maxlength", "20");
                    $('#lblIDnumber').html('');
                    return true;
                }
            }
        }
    });
</script>

<script type="text/javascript">
    $(document).ready(function () {

        $("#Name,#FatherName,#MotherName,#NewName").blur(function (e) {
            if ($.trim($(this).val()).length < 2) {
                var thisId = $.trim($(this).attr("id")).toLowerCase();
                ////$(this).val("");
                switch (thisId) {
                    case "name":
                        $("#lblName").html("Name must be at least two characters long");
                        break;
                    case "fathername":
                        $("#lblFatherName").html("Father name must be at least two characters long");
                        break;
                    case "mothername":
                        $("#lblMotherName").html("Mother name must be at least two characters long");
                        break;
                    case "newname":
                        $("#lblNewName").html("New name must be at least two characters long");
                        break;
                    default:
                        $("#lblMotherName,#lblFatherName,#lblName,#lblNewName").html("");
                        break;
                }
            }
        });

        $("#AadharEnrollmentID").keyup(function () {
            $("#lblAadharEnrollmentSuppl").html('');
        });
        ////$("#DateOfBirth").change(function () {
        ////    if ($("#DateOfBirth").val() == '') {
        ////    }
        ////    else
        ////        $('#lblDateOfBirth').html('');
        ////});
        $('input[type=radio][name=Gender]').change(function () {
            if ($("input[name='Gender']:checked").val() == undefined) {
                $('#lblerrorGender').html('Gender is Mandatory');
            }
            else
                $("#lblerrorGender").html('');

            if ($("input[name='VerifyGender']:checked").val() != undefined) {
                $("#lblerrorVerifyGender").html('');
                if ($("input[name='Gender']:checked").val() != $("input[name='VerifyGender']:checked").val()) {
                    $("#lblerrorVerifyGender").html('Gender is a mismatch');
                    return false;
                }
                else {
                    $("#lblerrorVerifyGender").html('');
                    return true;
                }
            }
        });
        $('input[type=radio][name=Yearofpassing]').change(function () {
            if ($("#Yearofpassing :selected").html() == "--Select--") {
                $("#lblYearofpassing").html('Year of Passing is mandatory');
            }
            else
                $("#lblYearofpassing").html('');
        });
        $("#Gender").change(function () {
            $("#lblerrorGender").html('');
        });
        $("#TypeofID").change(function () {
            $("#lblTypeofID").html('');
            $("#IDnumber").val('');
            $("#lblIDnumber").html("");
            if ($.trim($("#TypeofID").val()) == '3') { // PAN Card
                $('#IDnumber').attr("maxlength", "10");
            }
            else if ($.trim($("#TypeofID").val()) == '4') {  //Passport
                $('#IDnumber').attr("maxlength", "8");
            }
            else if ($.trim($("#TypeofID ").val()) == '6') { //Voter ID
                $('#IDnumber').attr("maxlength", "20");
            }
            else if ($.trim($("#TypeofID").val()) == '') {
                $('#IDnumber').attr("maxlength", "20");
                $('#lblTypeofID').html('ID Number is mandatory');
            }
            else {
                $('#IDnumber').attr("maxlength", "20");
            }
        });

        $("#Name").keyup(function () {
            $("#lblName").html('');
        });
        $("#FatherName").keyup(function () {
            $("#lblFatherName").html('');
        });
        $("#MotherName").keyup(function () {
            $("#lblMotherName").html('');
        });
        $("#EducationBoard").change(function () {
            //////debugger;
            $("#lblEducationBoard").html('');
            $("#lblVerifyEducationBoard").html('');
            if ($.trim($("#ddlEducationBoard").val()) != "") {
                $("#lblVerifyEducationBoard").html('');
                if ($.trim($('#EducationBoard').val()) == $.trim($('#ddlEducationBoard').val())) {
                    $("#lblVerifyEducationBoard").html('');
                    return true;
                }
                else {
                    if ($.trim($(this).val()) == "") {
                        $("#lblEducationBoard").html('Education Board is mandatory');
                    }
                    else {
                        $("#lblVerifyEducationBoard").html('Education Board is a mismatch');
                    }

                    $('#ddlEducationBoard').val("");
                    return false;
                }
            }
            else {
                if ($.trim($(this).val()) == "") {
                    $("#lblEducationBoard").html('Education Board is mandatory');
                }
                else {
                    $("#lblVerifyEducationBoard").html('');
                }
            }
        });

        $("#OriginState").change(function () {
            $("#lblOriginState").html('');
        });
        $("#SecondaryRollNum").keyup(function () {
            $("#lblSecondaryRollNum").html('');
        });
        $("#DateOfBirth").keyup(function () {
            $("#lblDateOfBirth").html('');

            var thisVal = $.trim($(this).val());
            if (thisVal.includes('../index.html') && thisVal.length >= 5) {
                var monVal = thisVal.split('../index.html')[1];
                var dateVal = thisVal.split('../index.html')[0];
                if (monVal == "2" || monVal == "02") {
                    if (parseInt(dateVal) >= 30) {
                        $(this).val("");
                        $("#lblDateOfBirth").html('Please enter a valid date');
                    }
                }
                else if (monVal == "01" || monVal == "1" || monVal == "03" || monVal == "3" || monVal == "05" || monVal == "5" || monVal == "07" || monVal == "7" || monVal == "08" || monVal == "8"
                    || monVal == "10" || monVal == "12") {
                    if (parseInt(dateVal) > 31) {
                        $(this).val("");
                        $("#lblDateOfBirth").html('Please enter a valid date');
                    }
                }
                else if (monVal == "04" || monVal == "4" || monVal == "6" || monVal == "06" || monVal == "09" || monVal == "9" || monVal == "11") {
                    if (parseInt(dateVal) > 30) {
                        $(this).val("");
                        $("#lblDateOfBirth").html('Please enter a valid date');
                    }
                }
            }

        });
        $("#Levelofeducationqualification").change(function () {
            $("#lblLevelofeducationqualification").html('');
        });
        $("#MobileNum").keyup(function () {
            //////debugger;
            $("#lblMobileNum").html('');
            if ($.trim($("#MobileNum").val()).lastIndexOf('0') === 0) {
                $('#lblMobileNum').html('Mobile number should not start with 0');
                $("#MobileNum").val('');
            }

            if ($.trim($("#MobileNum").val()) != "" && $.trim($("#VerifyMobileNum").val())) {
                if ($.trim($("#MobileNum").val()) != $.trim($("#VerifyMobileNum").val())) {
                    $('#lblVerifyMobileNum').html('Mobile number is a mismatch');
                }
                else {
                    $('#lblVerifyMobileNum').html("");
                }
            }

        });

        $("#EmailID").keyup(function () {

            $('#lblEmailID').html('');
            var x = $.trim($("#EmailID").val());
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                $('#lblEmailID').html('Not a valid e-mail address');
                return false;
            }
            else {
                $('#lblEmailID').html('');
                var varEmailID = $.trim($("#EmailID").val());

                if ($.trim($("#EmailID").val()).toLowerCase() != $.trim($("#VerifyEmailID").val()).toLowerCase() && $.trim($("#VerifyEmailID").val()) != "") {
                    $('#lblVerifyEmailID').html('Email id is a mismatch');
                }
                else {
                    $('#lblVerifyEmailID').html('');
                }
              var token = $('input[name="__RequestVerificationToken"]').val();

                jQuery.ajax({
                    url: "/Registration/CheckEmailID",
                    type: "POST",
                    dataType: "json",
                    // contentType: "application/json; charset=utf-8",
                    data: {__RequestVerificationToken: token,EmailID:varEmailID},
                    success: successFuncEmail,
                    failure: errorFuncEmail
                });
            }
        }
        );

        function successFuncEmail(data, status) {
            //debugger;

            // Changing the check due to issue in the validation of the field
            // Developer Name: Ashirwad
            // Date: 02/09/2020
            if ($.trim(data).toLowerCase() == "1") {
                $('#lblEmailID').text("this e-mail id already exists");
                $("#EmailID").val('');
                $("#EmailID").focus();
            }
            else {
                $('#lblEmailID').html('');
            }
        }

        function errorFuncEmail() {
            $('#lblEmailID').html('error was occured.');
        }


        $("#MobileNum").keyup(function () {
            //////debugger;
            $('#lblMobileNum').html('');
            var x = $.trim($("#MobileNum").val());
            var checkfrst = x.substr(0, 1);
            if (checkfrst < 6) {
                $('#lblMobileNum').html('Not a valid Mobile Number');
                return false;
            }
            else {
                $('#lblMobileNum').html('');
                if ($.trim($("#MobileNum").val()).length == 10) {
                    var varMobileNum = $("#MobileNum").val();
                    jQuery.ajax({
                        url: "/Registration/CheckMobileNum",
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: "{MobileNum:'" + varMobileNum + "'}",
                        success: successFuncMobileNum,
                        error: errorFuncMobileNum
                    });
                }
            }
        });

        function successFuncMobileNum(data, status) {
            if ($.trim(data) == "1" || $.trim(data) != "") {//$.trim(data).toLowerCase() == "this mobile number already exists" ||
                if ($.trim(data) == "1") {
                    $('#lblMobileNum').html("This mobile number already exists");
                }
                else {
                    $('#lblMobileNum').html(data);
                }
                $("#MobileNum").val('');
                $("#MobileNum").focus();
            }
            else {
                $('#lblMobileNum').html('');
            }
        }

        function errorFuncMobileNum(xhr,statusText,error) {
            $('#lblMobileNum').html('Please enter a valid mobile no.');
        }

        $("#AadharNumber").keyup(function () {
            //////debugger;
            $('#lblAadharNumber').html('');
            if ($.trim($("#AadharNumber").val()) != $.trim($("#VerifyAadharNumber").val()) && $.trim($("#VerifyAadharNumber").val())) {
                $('#lblVerifyAadharSupp').html('Aadhaar number is a mismatch');
            }
            else {
                $('#lblVerifyAadharSupp').html('');
            }
            if ($.trim($(this).val()).length == 12) {
                var varAadharNum = $.trim($(this).val());
                jQuery.ajax({
                    url: "/Registration/CheckAadharNum",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: "{AadharNum:'" + varAadharNum + "'}",
                    success: successFuncAadharNum,
                    failure: errorFuncAadharNumber
                });
            }

        });

        function successFuncAadharNum(data, status) {
            if ($.trim(data).toLowerCase() == "this aadhar number already exists") {
                //alert($('#lblAadharNumber').length + ", is visible" + $('#lblAadharNumber').is(":visible"));
                $('#lblAadharNumber').html(data);
                $("#AadharNumber").val('');
                $("#AadharNumber").focus();
            }
            else {
                $('#lblAadharNumber').html('');
            }
        }

        function errorFuncAadharNumber() {
            $('#lblAadharNumber').html('error was occured.');
        }
    });


</script>