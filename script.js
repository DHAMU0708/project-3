function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$(document).ready(function () {
  // Limit phone number to digits and 10 digits only
  $("#phoneno").on("input", function () {
    let cleaned = $(this).val().replace(/\D/g, '');
    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }
    $(this).val(cleaned);
  });

  // Show/hide password
  $("#togglePassword").on("click", function () {
    const field = $("#password");
    const type = field.attr("type") === "password" ? "text" : "password";
    field.attr("type", type);
    $(this).text(type === "password" ? "Show" : "Hide");
  });

  $("#toggleConfirmPassword").on("click", function () {
    const field = $("#confirmpassword");
    const type = field.attr("type") === "password" ? "text" : "password";
    field.attr("type", type);
    $(this).text(type === "password" ? "Show" : "Hide");
  });

  // Submit validation
  $("#submitbutton").on("click", function (event) {
    event.preventDefault();

    var errormessage = "";
    var missingfield = "";

    const emailVal = $("#Email").val().trim();
    const phoneVal = $("#phoneno").val().trim();
    const passVal = $("#password").val();
    const confirmPassVal = $("#confirmpassword").val();

    // 1. Missing field check
    if (!emailVal) {
      missingfield += "<p>Email not filled</p>";
    }

    if (!phoneVal) {
      missingfield += "<p>Phone number not filled</p>";
    }

    if (!passVal) {
      missingfield += "<p>Password not filled</p>";
    }

    if (!confirmPassVal) {
      missingfield += "<p>Confirm password not filled</p>";
    }

    // 2. Only run format checks if no missing fields
    if (missingfield === "") {
      if (!isEmail(emailVal)) {
        errormessage += "<p>Email id is not valid</p>";
      }

      if (!$.isNumeric(phoneVal) || phoneVal.length !== 10) {
        errormessage += "<p>Phone number is not valid (10 digits required)</p>";
      }

      if (passVal !== confirmPassVal) {
        errormessage += "<p>Password does not match</p>";
      }
    }

    // 3. Display feedback
    if (missingfield || errormessage) {
      $("#errors").html(missingfield + errormessage);
      $("#success").html("");
    } else {
      $("#success").html("You are registered");
      $("#errors").html("");
    }
  });
});
