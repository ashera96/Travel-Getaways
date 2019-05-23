import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-add-tours',
  templateUrl: './add-tours.component.html',
  styleUrls: ['./add-tours.component.scss']
})
export class AddToursComponent implements OnInit {
  id: string;
  editMode = false;
  tourForm: FormGroup;
  // tourForm: FormGroup = new FormGroup({
  //   title: FormControl(null, [Validators.required]),
  //   duration: FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
  //   description: FormControl(null, [Validators.required]),
  //   city: FormControl(null, [Validators.required]),
  //   address: FormControl(null, [Validators.required]),
  //   price_adult: FormControl(null, [Validators.required]),
  //   // program: FormArray([])
  // })
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          // this.editMode = params['id'] != null;
          // console.log(this.editMode);
          this.initForm();
        }
      );
  }
  
  private initForm() {
    let title = '';
    let duration = 0;
    let description = '';
    let city = '';
    let address = '';
    let price_adult = null;
    let price_child = null;
    let program = new FormArray([]);

    // if (this.editMode){
    //   const recipe = this.recipeService.getRecipe(this.id);
    //   recipeName = recipe.name;
    //   recipeImagePath = recipe.imagePath;
    //   recipeDescription = recipe.description;
    //   if (recipe['ingredients']) {
    //     for (let ingredient of recipe.ingredients) {
    //       recipeIngredients.push(
    //         new FormGroup({
    //           'name': new FormControl(ingredient.name, Validators.required),
    //           'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    //         })
    //       );
    //     }
    //   }
    // }

    this.tourForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'duration': new FormControl(duration, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'description': new FormControl(description, Validators.required),
      'city': new FormControl(city, Validators.required),
      'address': new FormControl(address, Validators.required),
      'price_adult': new FormControl(price_adult, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
      'price_child': new FormControl(price_child, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
      'program': program
    });
  }

  onAddProgram() {
    (<FormArray>this.tourForm.get('program')).push(
      new FormGroup({
        'title': new FormControl(null, Validators.required),
        'description': new FormControl(null, [Validators.required])
      })
    );
  }

  onDeleteProgram(index: number) {
    (<FormArray>this.tourForm.get('program')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.tourForm.get('program')).controls;
  }

  onSubmit() {
    console.log(this.tourForm.value);
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    // } else {
    //   this.recipeService.addRecipe(this.recipeForm.value);
    // }
    this.tourForm.reset();
  }
}
