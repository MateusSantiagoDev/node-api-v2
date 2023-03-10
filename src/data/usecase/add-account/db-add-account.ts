import { AccountModel, AccountDto, AddAccount, AddAccountRepository, Encrypter } from './db-add-account-protocols'

export class DbAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AccountDto): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    return await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
  }
}
