import { getItem, setItem } from './storageService';

const EDM_MASTER_KEY = 'edm_master';
const EDM_ANSWERS_KEY = 'edm_answers';
const EDM_SCORES_KEY = 'edm_scores';

export function getEdmMaster() {
  return getItem(EDM_MASTER_KEY) || [];
}

export function saveEdmMaster(indicators) {
  setItem(EDM_MASTER_KEY, indicators);
  return true;
}

export function getEdmAnswers() {
  return getItem(EDM_ANSWERS_KEY) || {};
}

export function saveEdmAnswer(indicatorCode, answer) {
  const answers = getEdmAnswers();
  answers[indicatorCode] = {
    ...answer,
    updatedAt: new Date().toISOString(),
  };
  setItem(EDM_ANSWERS_KEY, answers);
  return answers;
}

export function clearEdmAnswers() {
  setItem(EDM_ANSWERS_KEY, {});
}

// SPT = tingkat × bobot
// STM = 4 × bobot
// SKPM aspek = (total SPT / total STM) × 100
export function calculateScores() {
  const master = getEdmMaster().filter(i => i.active !== false);
  const answers = getEdmAnswers();

  const aspects = {};
  master.forEach(ind => {
    const aspek = ind.aspek ? ind.aspek.charAt(0) : 'A';
    if (!aspects[aspek]) {
      aspects[aspek] = { totalSPT: 0, totalSTM: 0, indicators: [] };
    }
    const stm = 4 * (ind.bobot || 1);
    const answer = answers[ind.kode];
    const tingkat = answer ? (answer.tingkat || 0) : 0;
    const spt = tingkat * (ind.bobot || 1);
    aspects[aspek].totalSPT += spt;
    aspects[aspek].totalSTM += stm;
    aspects[aspek].indicators.push({
      ...ind,
      tingkat,
      spt,
      stm,
      answered: !!answer,
    });
  });

  const aspectScores = {};
  Object.entries(aspects).forEach(([key, val]) => {
    aspectScores[key] = {
      totalSPT: val.totalSPT,
      totalSTM: val.totalSTM,
      skpm: val.totalSTM > 0 ? (val.totalSPT / val.totalSTM) * 100 : 0,
      indicators: val.indicators,
    };
  });

  const skpmValues = Object.values(aspectScores).map(a => a.skpm);
  const totalSKPM = skpmValues.length > 0
    ? skpmValues.reduce((a, b) => a + b, 0) / skpmValues.length
    : 0;

  let category = 'Kurang';
  if (totalSKPM > 80) category = 'Sangat Baik';
  else if (totalSKPM > 60) category = 'Baik';
  else if (totalSKPM > 40) category = 'Cukup';

  setItem(EDM_SCORES_KEY, { aspects: aspectScores, totalSKPM, category });

  return { aspects: aspectScores, totalSKPM, category };
}

export function getScores() {
  return getItem(EDM_SCORES_KEY) || null;
}

export function getRecommendation(tingkat) {
  if (tingkat <= 2) return { level: 'prioritas-utama', text: 'Prioritas Utama - Perlu perbaikan segera', color: 'red' };
  if (tingkat === 3) return { level: 'perlu-ditingkatkan', text: 'Perlu Ditingkatkan', color: 'yellow' };
  return { level: 'dipertahankan', text: 'Dipertahankan', color: 'green' };
}

export default { getEdmMaster, saveEdmMaster, getEdmAnswers, saveEdmAnswer, clearEdmAnswers, calculateScores, getScores, getRecommendation };