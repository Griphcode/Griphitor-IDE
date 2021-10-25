function addChip(amount) {
  let newval;
  storeData("saved", "true");
  let chips = Number(getData("chips"));
  if (chips == "null") {
    newval = amount
  } else {
    newval = chips + amount
  }
  updateData("chips", newval);
  console.log("Added cookie");
  chipdisplay.innerHTML = newval;
}

/* Check if settings were saved before */
let pref = JSON.parse(getData("prefrences"));
console.log("Saved settings: "+JSON.stringify(pref));
if (pref != null) {
  if (pref.saved == "true") {
    //if (pref.view == "Darkmode") {
    //  document.getElementById("drkmdbtn").checked = true;
    //} else {
    //  document.getElementById("drkmdbtn").checked = true;
    //};
    //Viewmode(pref.view);
  } else {
    /* User does not have any saved settings, Set to normal */
    var prefrences = {
      "saved": "false",
      "view": "Darkmode"
    }
    storeData("prefrences", prefrences);
    let pref = JSON.parse(JSON.stringify(getData("prefrences")));
    Viewmode(pref.view);
  }
}
