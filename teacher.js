define(['pipAPI'], function(APIconstructor) {

var API = new APIconstructor();

API.addStimulusSets({
    red: [
		{media:'Red', css:{color:'red'}},
		{media:'Blue', css:{color:'red'}}
	], 
    blue: [
		{media:'Red', css:{color:'blue'}},
		{media:'Blue', css:{color:'blue'}}
	],
	error: [
	    {handle:'error',media:'X', css:{fontSize:'2em',color:'#FF0000'}, location:{bottom:30}}
	]
});

API.addTrialSets('base',[{
	input: [
		{handle:'red',on:'keypressed',key:'1'},
		{handle:'blue',on:'keypressed',key:'2'}
	],
	layout: [
		{media:'1',location:{left:2,top:2},css:{background:'red',padding:'2%',fontSize:'1.5em'}},
		{media:'2',location:{right:2,top:2},css:{background:'blue',padding:'2%',fontSize:'1.5em'}},
		{media:'Press 1 for red, 2 for blue',location:{bottom:1}}
	],
	interactions: [
		{
			conditions:[{type:'begin'}],
			actions: [{type:'showStim', handle: 'target'}]
		},
		{
			conditions: [
				{type:'inputEqualsTrial',property:'group'}
			],
			actions: [
				{type:'setTrialAttr', setter:{score:1}},
				{type:'log'},
				{type:'trigger', handle:'ITI'}
			]
		},
		{
			conditions: [
				{type:'inputEqualsTrial',property:'group',negate:true},
				{type:'inputEquals',value:['red','blue']}
			],
			actions: [
				{type:'setTrialAttr', setter:{score:0}},
				{type:'log'},
				{type:'showStim', handle:'error'},
				{type:'removeInput',handle:['red','blue','green']},
				{type:'trigger', handle:'ITI', duration:500}
			]
		},
		{
			conditions: [{type:'inputEquals', value:'ITI'}],
			actions:[
				{type:'hideStim',handle:'All'},
				{type:'removeInput',handle:['red','blue','green']},
				{type:'trigger', handle:'end',duration:500}
			]
		},
		{
			conditions: [{type:'inputEquals', value:'end'}],
			actions:[
				{type:'endTrial'}
			]
		}
	]
}]);

API.addSequence([
	{
		mixer: 'random',
		data: [
			{
				mixer: 'repeat',
				times: 5,
				data: [
					{
	                    inherit:'base',
	                    data: {group:'red'},
	                    stimuli: [
		                    {inherit:{set:'red',type:'exRandom'}, handle:'target'},
		                    {inherit:'error'}
	                    ]
                    },
					{
	                    inherit:'base',
	                    data: {group:'blue'},
	                    stimuli: [
		                    {inherit:{set:'blue',type:'exRandom'}, handle:'target'},
		                    {inherit:'error'}
	                    ]
                    }
				]
			}
		]
	}
]);
