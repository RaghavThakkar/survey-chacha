$(document).ready(function() {
   
    var max_fields = 5;
    var wrapper = $(".container1");
    var add_button = $("#tf");
    var mcq = $("#mcq");
    var idSet=new Set();
    var x = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        if (x < max_fields) {
            // let numberQuestion = document.querySelectorAll('[id="1"]');
            x++;
            // numberQuestion.forEach(p =>console.log( p.getAttribute("index")));
            idSet.add(x);
            $(wrapper).append(`  <div class="delete card shadow-lg p-3 mb-2 bg-white rounded" style="  border-left: 5px solid rgb(114, 114, 114)">
            <div class="card-body">
                <h5 class="card-title">Question 1</h5>
                <button id="tf" type="reset" class="btn btn-warning delete"><i class="fas fa-undo"></i>
                    Delete</button>
                <div class="col-auto">
                    <label class="sr-only" for="inlineFormInputGroup"></label>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Question1</div>
                        </div>
                        <input type="text" required name="q${x}" class="form-control" id="inlineFormInputGroup"
                            placeholder="Question">
                            <input type="hidden" name="q${x}Type" value="1" class="form-control" id="inlineFormInputGroup"
                            placeholder="Question">
                    </div>
                </div>

              
               



                   
                </div>
            </div>
        </div>`);
          //add input box
        } else {
            alert('You Reached the limits')
        }
    });

    $(mcq).click(function(e) {
        e.preventDefault();
        if (x < max_fields) {
            // let numberQuestion = document.querySelectorAll('[id="1"]');
            x++;
            // numberQuestion.forEach(p =>console.log( p.getAttribute("index")));
            idSet.add(x);
            $(wrapper).append(`  <div class="card shadow-lg p-3 mb-2 bg-white rounded" style="  border-left: 5px solid rgb(114, 114, 114)">
            <div class="card-body">
            <button id="tf" type="reset" class="btn btn-warning delete"><i class="fas fa-undo"></i>
            Delete</button>
                <h5 class="card-title">Question 1</h5>
                <div class="col-auto">
                    <label class="sr-only" for="inlineFormInputGroup"></label>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Question1</div>
                        </div>
                        <input type="text" required name="q1" class="form-control" id="inlineFormInputGroup"
                            placeholder="Question">
                            <input type="hidden" name="q${x}Type" value="2" class="form-control" id="inlineFormInputGroup"
                            placeholder="Question">
                    </div>
                </div>



                <div class="op1">
                    <h5 class="card-title">Options</h5>
                    <div class="col-auto">
                        <label class="sr-only" for="inlineFormInputGroup"></label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">Option</div>
                            </div>
                            <input type="text" required name="q${x}o1" class="form-control" id="inlineFormInputGroup"
                                placeholder="Option1">
                        </div>
                    </div>

                    <div class="col-auto">
                        <label class="sr-only" for="inlineFormInputGroup"></label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">Option</div>
                            </div>
                            <input type="text" required name="q${x}o2" class="form-control" id="inlineFormInputGroup"
                                placeholder="Option2">
                        </div>
                    </div>

                    <div class="col-auto">
                        <label class="sr-only" for="inlineFormInputGroup"></label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">Option</div>
                            </div>
                            <input type="text" required name="q${x}o3" class="form-control" id="inlineFormInputGroup"
                                placeholder="Option3">
                        </div>
                    </div>

                    <div class="col-auto">
                        <label class="sr-only" for="inlineFormInputGroup"></label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">Option</div>
                            </div>
                            <input type="text" required name="q${x}o4" class="form-control" id="inlineFormInputGroup"
                                placeholder="Option4">
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
          //add input box
        } else {
            alert('You Reached the limits')
        }
    });
    $(wrapper).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').parent('div').remove();
        x--;
    })
});




