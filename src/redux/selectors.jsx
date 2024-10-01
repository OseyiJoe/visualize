export const selectVotes = state => state.votes.polls.items;

export const selectScoobyVotes = state => 2;

export const selectGoofyVotes = state => 3;

export const selectBrianVotes = state => 4;
//export const selectContactsFilter = state => state.filter;

export const selectIsLoading = state => state.votes.polls.isLoading;

export const selectError = state => state.votes.polls.error;