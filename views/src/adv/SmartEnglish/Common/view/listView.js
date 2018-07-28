import React from "react"
export function listView(data){
    let wordbook = "",word_vi="",pronunciation="",audio="",edit_at = "",id="";
    wordbook = data["wordbook"]["en"];
    word_vi = data["wordbook"]["vi"];
    pronunciation = data["pronunciation"]["en"];
    audio = data["audio"]["en"];
    edit_at = "";
    id = data["_id"]
    return (
        <tr>
            <td><input type="checkbox"/></td>
            <td>1</td>
            <td>{wordbook}</td>
            <td>{word_vi}</td>
            <td>{pronunciation}</td>
            <td>{audio}</td>
            <td>
                <a href={`/panel/StudySmart/AE?id=${id}`}><i class="fas fa-edit"></i></a> &nbsp;&nbsp;
                <i class="fas fa-trash-alt"></i>
            </td>
            <td>12-7-2016</td>
        </tr>
    );
}