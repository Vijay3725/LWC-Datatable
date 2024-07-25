import { LightningElement,  track } from 'lwc';
import fetchAccounts from '@salesforce/apex/ApexDatable.fetchAccounts';

import Name from '@salesforce/schema/Account.Name';
import Industry from '@salesforce/schema/Account.Industry';
import AnnualRevenue from '@salesforce/schema/Account.AnnualRevenue';

const COLUMNS = [
    {label: "Name", fieldName: Name.fieldApiName, type: "name"},
    {label: "Industry", fieldName: Industry.fieldApiName, type: "text"},
    {label: "AnnualRevenue", fieldName: AnnualRevenue.fieldApiName, type: "currency"}
];
export default class LwcDatatable extends LightningElement {
    columns = COLUMNS;
    @track result;
    @track error;
    @track accountSearched;

    @track showAccounts = false;

   getAccountData(){
    fetchAccounts({search:this.accountSearched})
    .then(data => {
        this.result = data;
    })
    .catch(error => {
        this.error = error;
    })
   }

   handleChange(event){
    this.accountSearched = event.target.value;
    this.showAccounts = true;

    if(this.accountSearched === ""){
        this.accountSearched = "!@#$%^&*()";
        this.showAccounts = false;
    }
    this.getAccountData();
   }
}