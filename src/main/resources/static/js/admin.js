function modalOpen(type, nickname, user_id) {
	if(type == "board") {
		$("#modalTitle").text(nickname + "님의 작성 게시물");
		
		let item = 
			`<tr>
				<th class="board-table-no">번호</th>
				<th class="board-table-title">제목</th>
				<th class="board-table-date">작성일</th>
				<th class="board-table-view">조회수</th>
				<th class="board-table-recommend">추천수</th>
			</tr>`
		
		$.ajax({
		url: `/api/board/${user_id}`,
		dataType: "json"
		}).done(resp => {
			resp.forEach((board) => {
				item += getBoardModalItem(board);
			});
			$("#modalBody").append(item);
		}).fail(error => {
			console.log(error);
		});
	} else {
		$("#modalTitle").text(nickname + "님의 작성 댓글");
		
		let item = 
			`<tr>
				<th class="board-table-no">번호</th>
				<th class="board-table-title">내용</th>
				<th class="board-table-date">작성일</th>
			</tr>`
		
		$.ajax({
		url: `/api/reply/${user_id}`,
		dataType: "json"
		}).done(resp => {
			resp.forEach((reply) => {
				item += getReplyModalItem(reply);
			});
			$("#modalBody").append(item);
		}).fail(error => {
			console.log(error);
		});
	}
}

function getBoardModalItem(board) {
	let item = 
		`<tr>
			<th>${board.id}</th>				
			<th class="board-table-title">${board.title}</th>
			<th>${board.create_date}</th>
			<th>${board.views}</th>
			<th>${board.recommends}</th>
		</tr>`;

	return item;
}

function getReplyModalItem(reply) {
	let item = 
		`<tr>
			<th>${reply.id}</th>				
			<th class="board-table-title">${reply.content}</th>
			<th>${reply.create_date}</th>
		</tr>`;

	return item;
}

function modalClose() {
	$("#modalHead > tr").remove();
	$("#modalBody > tr").remove();
}