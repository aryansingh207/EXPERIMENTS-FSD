export const PLATFORM_CONFIGS = {
  twitter: { maxChars: 280, hashtagRequired: false, icon: '🐦', name: 'Twitter', color: '#1DA1F2' },
  facebook: { maxChars: 5000, hashtagRequired: false, icon: '📘', name: 'Facebook', color: '#1877F2' },
  linkedin: { maxChars: 3000, hashtagRequired: false, icon: '🔗', name: 'LinkedIn', color: '#0A66C2' },
  instagram: { maxChars: 2200, hashtagRequired: true, icon: '📸', name: 'Instagram', color: '#E4405F' },
};

export const validatePost = (content, platformId) => {
  const config = PLATFORM_CONFIGS[platformId];
  if (!config) {
    return { valid: false, errors: ['Invalid platform selected'] };
  }
  const errors = [];
  if (!content || content.trim().length === 0) {
    errors.push('Content is required');
  }
  if (content.length > config.maxChars) {
    errors.push(`Character limit exceeded: ${config.maxChars} characters allowed`);
  }
  if (config.hashtagRequired && !content.includes('#')) {
    errors.push('At least one hashtag (#) is required for Instagram');
  }
  if (content.trim().length > 0 && content.trim().length < 10) {
    errors.push('Content is too short (minimum 10 characters)');
  }
  return {
    valid: errors.length === 0,
    errors,
    remainingChars: config.maxChars - content.length,
    isOverLimit: content.length > config.maxChars,
  };
};

export const validateAllPlatforms = (content, platformIds) => {
  const results = {};
  let allValid = true;
  const allErrors = [];
  platformIds.forEach(platformId => {
    const result = validatePost(content, platformId);
    results[platformId] = result;
    if (!result.valid) {
      allValid = false;
      allErrors.push(...result.errors);
    }
  });
  return { valid: allValid, errors: allErrors, platformResults: results };
};

export const getPlatformLimits = (platformIds, content) => {
  return platformIds.map(platformId => {
    const config = PLATFORM_CONFIGS[platformId];
    return {
      id: platformId,
      name: config.name,
      icon: config.icon,
      maxChars: config.maxChars,
      currentCount: content.length,
      remaining: config.maxChars - content.length,
      isOverLimit: content.length > config.maxChars,
      percentage: Math.min((content.length / config.maxChars) * 100, 100),
    };
  });
};