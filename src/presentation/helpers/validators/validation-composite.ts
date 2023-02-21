import { Validation } from './validation'

// essa class recebe no constructor um array
// de validadores com o tipo validator
export class ValidationComposite implements Validation {
  private readonly validations: Validation[]
  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error {
    // estou fazendo um lup no validator
    for (const validation of this.validations) {
      // se o erro existir retorna o erro se não segue fazendo o lup
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}