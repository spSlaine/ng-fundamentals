import { Validator, FormGroup, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[validateLocation]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: LocationValidatorDirective,
            multi: true
        }
    ]
})

export class LocationValidatorDirective implements Validator {

    validate(formGroup: FormGroup): ValidationErrors {
        let addressControl = formGroup.controls['address']
        let cityControl = formGroup.controls['city']
        let countryControl = formGroup.controls['country']
        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl']

        if (
            ((addressControl && addressControl.value) && (cityControl && cityControl.value) && (countryControl && countryControl.value)) 
            || 
            (onlineUrlControl && onlineUrlControl.value)
        ) {
            return null
        } else {
            return {
                validateLocation: false
            }
        }

    }

    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }

}