const SetVotingDeadline = (dateCreated)=>{
	let t = new Date(dateCreated);
	let tt = t.getTime();
	let ttt = Math.floor((tt - Date.now()) / 86400000 );
	let tttt = 0;
	if(ttt < 0){
		tttt = 'is closed';
		//listing.isThereNew = true;
	}else if(ttt === 0){
		tttt = 'closes today';
		//listing.isThereNew = true;
	} else if(ttt < 7){
		//listing.isThereNew = true;
		tttt = (ttt > 1)? 
				`closes in ${ttt} days`:
				`closes in ${ttt} day`;
	} else if(ttt >= 7 && ttt < 30){
		tttt = (Math.floor(ttt / 7) > 1)? 
				`closes in ${Math.floor(ttt / 7)} weeks`:
				`closes in ${Math.floor(ttt / 7)} week`;
	} else if(ttt >= 30 && ttt < 365){
		tttt = (Math.floor(ttt / 30) > 1)? 
				`closes in ${Math.floor(ttt / 30)} months`:
				`closes in ${Math.floor(ttt / 30)} month`;
	}
	return tttt;
}
export default SetVotingDeadline;