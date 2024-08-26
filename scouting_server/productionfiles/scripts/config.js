var game_config = `
{
    "prematch": [
        {
            "id": "scouter_name",
            "type": "text",
            "text": "紀錄者姓名",
            "default_value": "Wang"
        },
        {
            "id": "game_number",
            "type": "text",
            "text": "比賽場次",
            "default_value": "1"
        },
        {
            "id": "team_number",
            "type": "text",
            "text": "隊伍編號",
            "default_value": ""
        },
        {
            "id": "not_participated",
            "type": "checkbox",
            "text": "未上場比賽"
        }
    ],
    "auto": [
        {
            "id": "auto_taxi",
            "type": "checkbox",
            "text": "離開起始區域"
        },
        {
            "id": "auto_amp",
            "type": "counter",
            "text": "自動Amp數量",
            "default_value": "0"
        },
        {
            "id": "auto_speaker",
            "type": "counter",
            "text": "自動Speaker數量",
            "default_value": "0"
        }
    ],
    "teleop": [
        {
            "id": "teleop_amp",
            "type": "counter",
            "text": "手動Amp數量",
            "default_value": "0"
        },
        {
            "id": "teleop_speaker",
            "type": "counter",
            "text": "手動Speaker數量",
            "default_value": "0"
        }
    ],
    "endgame": [
        {
            "id": "endgame_state",
            "type": "radio",
            "text": "Endgame狀態",
            "choices": {
                "x": "未得分",
                "park": "Park",
                "onstage": "Onstage",
                "trap": "Trap"
            },
            "default_value": "x"
        },
        {
            "id": "disabled",
            "type": "checkbox",
            "text": "機器人一度完全靜止不動"
        },
        {
            "id": "driver_defense",
            "type": "radio",
            "text": "車手防守技術",
            "choices": {
                "0": "無",
                "1": "1(壞)",
                "2": "2",
                "3": "3(好)"
            },
            "default_value": "0"
        },
        {
            "id": "driver_counterdefense",
            "type": "radio",
            "text": "車手反防守技術",
            "choices": {
                "0": "無",
                "1": "1(壞)",
                "2": "2",
                "3": "3(好)"
            },
            "default_value": "0"
        },
        {
            "id": "game_point",
            "type": "text",
            "text": "聯盟總得分",
            "default_value": "0"
        },
        {
            "id": "oppo_penal_points",
            "type": "text",
            "text": "對手聯盟Penalty得分",
            "default_value": "0"
        },
        {
            "id": "comment",
            "type": "textarea",
            "text": "其他評論或無法記錄的部分"
        }
    ],
    "result": [
    ]
}`;