/*
var test = axios.get("https://us-street.api.smartystreets.com/street-address?street=123+main+Schenectady+NY&auth-id=22757391512408491").then(function(response){
	console.log(response);
});
*/

var app = new Vue({
	el: '#app',
	data: {
		states: 
			{
				"AL": "Alabama",
				"AK": "Alaska",
				"AS": "American Samoa",
				"AZ": "Arizona",
				"AR": "Arkansas",
				"CA": "California",
				"CO": "Colorado",
				"CT": "Connecticut",
				"DE": "Delaware",
				"DC": "District Of Columbia",
				"FM": "Federated States Of Micronesia",
				"FL": "Florida",
				"GA": "Georgia",
				"GU": "Guam",
				"HI": "Hawaii",
				"ID": "Idaho",
				"IL": "Illinois",
				"IN": "Indiana",
				"IA": "Iowa",
				"KS": "Kansas",
				"KY": "Kentucky",
				"LA": "Louisiana",
				"ME": "Maine",
				"MH": "Marshall Islands",
				"MD": "Maryland",
				"MA": "Massachusetts",
				"MI": "Michigan",
				"MN": "Minnesota",
				"MS": "Mississippi",
				"MO": "Missouri",
				"MT": "Montana",
				"NE": "Nebraska",
				"NV": "Nevada",
				"NH": "New Hampshire",
				"NJ": "New Jersey",
				"NM": "New Mexico",
				"NY": "New York",
				"NC": "North Carolina",
				"ND": "North Dakota",
				"MP": "Northern Mariana Islands",
				"OH": "Ohio",
				"OK": "Oklahoma",
				"OR": "Oregon",
				"PW": "Palau",
				"PA": "Pennsylvania",
				"PR": "Puerto Rico",
				"RI": "Rhode Island",
				"SC": "South Carolina",
				"SD": "South Dakota",
				"TN": "Tennessee",
				"TX": "Texas",
				"UT": "Utah",
				"VT": "Vermont",
				"VI": "Virgin Islands",
				"VA": "Virginia",
				"WA": "Washington",
				"WV": "West Virginia",
				"WI": "Wisconsin",
				"WY": "Wyoming"
			},
		address1: null,
		address2: null,
		city: null,
		state: null,
		zip: null,
		errors: []
	},
	methods: {
		validate: function(){
			this.errors = [];
			if(!this.address1){
				this.errors.push("Address1 cannot be blank");
			}
			if(!this.address2){
				this.errors.push("Address2 cannot be blank");
			}
			if(!this.city){
				this.errors.push("City cannot be blank");
			}
			if(this.state == "Choose..." || !this.state){
				this.errors.push("State cannot be blank");
			}
			if(!this.zip){
				this.errors.push("ZIP cannot be blank");
			}else if(!this.zip.match(/^\d{5}(?:[-\s]\d{4})?$/)){
				this.errors.push("ZIP must be 5 digits or 5+4 digits (ex. 12345-1234)");
			}
		},
		say: function(text){
			alert(this.address1);
		}
	}
})