import os
import asyncio
from datetime import datetime, date
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage
import hashlib

load_dotenv()

class AIWisdomService:
    def __init__(self):
        self.api_key = os.environ.get('EMERGENT_LLM_KEY')
        self.chat = LlmChat(
            api_key=self.api_key,
            session_id="divine-design-wisdom",
            system_message="""You are a spiritual wisdom generator for the Divine Design app. Your role is to create daily spiritual guidance based on these core principles:

1. DIVINE DESIGN vs EGO: Everything has a Divine Design guided by infinite wisdom, unconditional love, and perfect goodness. The ego creates problems by thinking it knows better.

2. GRACE: Blessings flow not because we earn them, but because infinite love gives them freely. Grace is the ultimate "cheat code."

3. TRANSFORMATION: Divine Design can create beauty from any chaos (even ego-created problems). Ego can create chaos from beauty through fear and control.

4. UNIVERSAL SPIRITUALITY: Use inclusive language that works for all spiritual paths - infinite wisdom, unconditional love, perfect goodness, divine source.

Generate content that:
- Helps people distinguish ego thoughts from soul wisdom
- Encourages surrender and trust in divine timing
- Teaches about grace and receiving blessings beyond merit
- Provides practical spiritual practices
- Maintains hope while acknowledging challenges
- Never mentions specific religions or deities by name

Format your responses as JSON with these fields:
{
  "quote": "Inspirational quote about Divine Design principles",
  "insight": "Deeper explanation of the spiritual principle",
  "practice": "Practical application for today"
}

Keep quotes concise but profound. Make insights accessible but spiritually rich. Make practices specific and actionable."""
        ).with_model("openai", "gpt-4o-mini")

    def get_date_seed(self, target_date=None):
        """Generate a consistent seed based on the date to ensure same content for same day"""
        if target_date is None:
            target_date = date.today()
        date_string = target_date.strftime("%Y-%m-%d")
        return hashlib.md5(date_string.encode()).hexdigest()[:8]

    async def generate_daily_wisdom(self, target_date=None):
        """Generate AI-powered daily wisdom for the specified date"""
        try:
            date_seed = self.get_date_seed(target_date)
            
            prompt = f"""Generate today's Divine Design wisdom for {target_date or date.today().strftime('%B %d, %Y')}.

Create a unique spiritual teaching that focuses on one of these themes:
1. The ego vs Divine Design (how ego creates problems while Divine Design creates solutions)
2. Grace and receiving blessings beyond what we think we deserve
3. Divine transformation (beauty from chaos, or ego creating chaos from beauty)
4. Surrender and trust in infinite wisdom
5. Practical spirituality for daily life

Include the seed: {date_seed} in your inspiration but don't mention it in the response.

Return only valid JSON with quote, insight, and practice fields."""

            user_message = UserMessage(text=prompt)
            response = await self.chat.send_message(user_message)
            
            # Parse the JSON response
            import json
            try:
                wisdom_data = json.loads(response)
                return wisdom_data
            except json.JSONDecodeError:
                # Fallback if AI doesn't return valid JSON
                return {
                    "quote": "Divine Design works in perfect timing, even when your ego demands immediate results.",
                    "insight": "Your ego creates stress by demanding control over timing and outcomes, but infinite wisdom knows the perfect moment for every blessing and lesson.",
                    "practice": "Today, when you feel impatient, breathe deeply and say: 'Divine timing is perfect timing. I trust the unfolding.'"
                }
                
        except Exception as e:
            print(f"Error generating AI wisdom: {e}")
            # Return fallback wisdom
            return {
                "quote": "Grace flows to you not because you've earned it, but because infinite love gives it freely.",
                "insight": "Your ego constantly judges whether you deserve good things, but grace operates beyond merit - flowing from infinite wisdom and unconditional love.",
                "practice": "When something beautiful comes into your life today, resist saying 'I don't deserve this.' Instead, receive it with gratitude as grace."
            }

    async def generate_spiritual_teaching(self, target_date=None):
        """Generate a deeper spiritual teaching for the day"""
        try:
            date_seed = self.get_date_seed(target_date)
            
            prompt = f"""Generate a comprehensive spiritual teaching for today about Divine Design principles.

Focus on creating a deeper lesson about:
- The nature of ego vs divine consciousness
- How Divine Design operates in practical life
- The role of grace in spiritual growth
- Transforming challenges into opportunities
- Universal spiritual truths that work for all paths

Include seed: {date_seed} for consistency.

Return JSON with these exact fields:
title: Teaching title
principle: Core spiritual principle being taught
teaching: Main explanation of the concept
application: How to apply this in daily life
reflection: A contemplative thought or question

Format as valid JSON only."""

            user_message = UserMessage(text=prompt)
            response = await self.chat.send_message(user_message)
            
            import json
            try:
                teaching_data = json.loads(response)
                return teaching_data
            except json.JSONDecodeError:
                # Fallback teaching
                return {
                    "title": "Living from Grace Instead of Earning",
                    "principle": "Grace flows from infinite love beyond human concepts of deserving",
                    "teaching": "The ego operates on an earning system - do good, get good; make mistakes, deserve punishment. But infinite wisdom operates on grace - giving what serves your highest good regardless of your ego's scorekeeping.",
                    "application": "Notice when you're trying to 'earn' love, success, or peace. Instead, practice receiving life's gifts as grace - unmerited expressions of infinite love.",
                    "reflection": "What would change in your life if you truly believed you were loved beyond your performance?"
                }
                
        except Exception as e:
            print(f"Error generating AI teaching: {e}")
            return {
                "title": "Living from Grace Instead of Earning",
                "principle": "Grace flows from infinite love beyond human concepts of deserving",
                "teaching": "The ego operates on an earning system, but infinite wisdom operates on grace.",
                "application": "Practice receiving life's gifts as grace rather than trying to earn them.",
                "reflection": "What would change if you believed you were loved beyond your performance?"
            }

# Create a singleton instance
ai_wisdom_service = AIWisdomService()