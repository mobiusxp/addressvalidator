/*
var test = axios.get("https://us-street.api.smartystreets.com/street-address?street=123+main+Schenectady+NY&auth-id=22757391512408491").then(function(response){
	console.log(response);
});
*/

var app = new Vue({
	el: '#app',
	data() {
		return { 
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
			errors: [],
			fatalerror: false,
			success: false,
			corrected: false,
			notfound: false,
			corrections: []
		}
	},
	methods: {
		formvalidate: function(){
			this.errors = [];
			this.fatalerror = false;
			this.success = false;
			this.corrected = false;
			this.notfound = false;

			if(!this.address1){
				this.errors.push("Address cannot be blank");
			}
			if(!this.city){
				this.errors.push("City cannot be blank");
			}
			if(this.state == "Choose..." || !this.state){
				this.errors.push("State cannot be blank");
			}
			if(this.zip && !this.zip.match(/^\d{5}(?:[-\s]\d{4})?$/)){
				this.errors.push("ZIP must be 5 digits or 5+4 digits (ex. 12345-1234)");
			}
		},
		addressvalidate: function(){
			axios.get('https://us-street.api.smartystreets.com/street-address', {
				params: {
					'auth-id': 'AUTH-ID',
					'auth-token': 'AUTH-TOKEN', 
					street: this.address1,
					secondary: this.address2,
					city: this.city,
					state: this.state,
					zipcode: this.zip,
					match: "strict"
				}
			})
			.then((response) => {
				if(response.data.length == 0){
					this.notfound = true;
				}
				else{				
					console.log(response);
					if(response.data[0].analysis.footnotes){
						var notes = response.data[0].analysis.footnotes.split("#");
					}
					if(notes.includes("A")){
						this.zip = response.data[0].components.zipcode + "-" + response.data[0].components.plus4_code;
						this.corrections.push("ZIP Code")
						this.corrected = true;
					}
					if(notes.includes("M")){
						this.address1 = response.data[0].components.primary_number + " " + response.data[0].components.street_name + " " + response.data[0].components.street_suffix;
						this.corrections.push("Address 1")
						this.corrected = true;
					}
					if(notes.includes("B")){
						this.city = response.data[0].components.city_name;
						this.state = response.data[0].components.state_abbreviation;
						this.corrections.push("City")
						this.corrected = true;
					}
					if(!this.corrected){
						this.success = true;
					}				
				}
			}).catch((error) => {
				this.fatalerror = true;
				console.log(error);
			})
		}
	}
})
