public with sharing class ApexDatable {
   @AuraEnabled(cacheable=true)
   public static List<Account> fetchAccounts(String search){
    String searchKey = '%'+search+'%';
    return [select Name, AnnualRevenue, Industry from Account Where Name like :searchKey];
   }
}