export default {
    NOTICE: [ // NOTICE 메뉴
        { index: 1, menuNm: '공지사항 조회', url: 'noticeMain' },
    ],
    IFREG: [
        { index: 1, menuNm: 'I/F 신청서', url: 'applyIf' },
        { index: 2, menuNm: 'I/F 정보 변경 요청서', url: 'chgIfinfo' },
    ],
    IFREGLIST: [
        { index: 1, menuNm: '신청목록', url: 'regList' },
    ],
    META_ALL: [
        { index: 1, menuNm: 'EIGW', url: 'eigwOnlineList' },
        { index: 2, menuNm: 'MCG', url: 'mcgDtlList' },
        { index: 3, menuNm: 'EAI', url: 'queueList' },
    ],
    META_EIGW: [
        { index: 1, menuNm: '온라인 리스트', url: 'eigwOnlineList' },
        { index: 2, menuNm: '메타정보', url: 'eigwFileList' },
    ],
    META_MCG: [
        { index: 1, menuNm: '채널 조회', url: 'mcgDtlList' },
        { index: 2, menuNm: '거래 조회', url: 'mcgTransInfo' },
    ],
    META_EAI: [
        { index: 1, menuNm: '큐 목록', url: 'queueList' },
        { index: 2, menuNm: '큐 매니저 목록', url: 'queueMgrList' },
        { index: 3, menuNm: '채널 목록', url: 'chnList' },
        { index: 4, menuNm: '노드 매니저 목록', url: 'nodeList' },
        { index: 5, menuNm: 'SWING DB 정보', url: 'swingDbInfo' },
    ],
    META: [
        { index: 1, menuNm: 'EIGW', url: 'aeigwOnlineListaa' },
        { index: 2, menuNm: 'MCG', url: 'mcgDtlList' },
        { index: 3, menuNm: 'EAI', url: 'queueList' },
    ],
    MGMT_COMM: [
        { index: 1, menuNm: '공통 코드 관리', url: 'ccCdList' },
        { index: 2, menuNm: '서버 정보 관리', url: 'serverList' },
        { index: 3, menuNm: '기관 코드 관리', url: 'instList' },
    ],
    MGMT_EIGW: [
        { index: 1, menuNm: '프로그램 관리', url: 'programInfo' },
        { index: 2, menuNm: '담당자 관리', url: 'accListEigw' },
        { index: 3, menuNm: '대외기관서버 관리', url: 'eigwServer' },
        { index: 4, menuNm: '메타정보', url: 'fileListAdmin' },
        { index: 5, menuNm: '메타정보(실시간)', url: 'onlineListAdmin' },
    ],
    MGMT_MCG: [
        { index: 1, menuNm: '가상사용자 관리', url: 'virtualUserList_MCG' },
    ],
};